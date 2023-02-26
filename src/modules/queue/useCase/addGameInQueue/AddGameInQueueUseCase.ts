import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";
import { IRequestQueueDTO } from "@modules/queue/dtos/IRequestQueueDTO";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";
import { socketio } from "@shared/socket.io";

@injectable()
class AddGameInQueueUseCase {
  constructor(
    @inject("QueueRepository") private queueRepository: IQueueRepository,
    @inject("GamesRepository") private gamesRepository: IGamesRepository,
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository,
    @inject("MembersRepository") private membersRepository: IMembersRepository,
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute({ modality_id, players }: IRequestQueueDTO): Promise<void> {
    const date_now = dayjs();
    const start_time_game = dayjs(date_now).toDate();

    const modalityExists = await this.modalitiesRepository.findById(
      modality_id
    );

    if (!modalityExists) {
      throw new AppError("A modalidade não existe");
    }

    if (modalityExists.status !== "ok") {
      throw new AppError("A modalidade não está disponível para jogos");
    }

    const findGame = await this.gamesRepository.findGameWithPlayers(
      players,
      start_time_game
    );

    const amoutPlayersInGameThisTime = findGame && findGame.players.length;

    if (amoutPlayersInGameThisTime > 0) {
      throw new AppError(
        "Todos ou alguns destes jogadores estão jogando ainda. Só podem entrar na lista de espera após o seu jogo terminar"
      );
    }

    const modalityGame = await this.modalitiesRepository.findById(modality_id);

    const amountPlayers = players.length;
    const amoutPlayersAllowed =
      modalityGame.amount_players as unknown as number;

    if (amountPlayers > amoutPlayersAllowed) {
      throw new AppError(
        `Esta modalidade permite apenas ${amoutPlayersAllowed} jogadores(as) `
      );
    }

    if (amountPlayers < amoutPlayersAllowed) {
      throw new AppError(
        `Esta modalidade permite ${amoutPlayersAllowed} jogadores, por favor adicione outro(s) jogadores(as)`
      );
    }

    const playersInQueueGame =
      await this.queueRepository.findPlayersInQueueGames(players);

    if (playersInQueueGame) {
      throw new AppError(
        "Alguns ou todos estes jogadores, já estão na fila de espera para a próxima quadra livre"
      );
    }

    const playersQueue = await this.membersRepository.findByIds(players);
    await this.queueRepository.create({
      modality_id,
      played: "no",
      players: playersQueue,
    });

    socketio.emit("reloadApp", "Cadastrou a fila de espera");
  }
}

export { AddGameInQueueUseCase };
