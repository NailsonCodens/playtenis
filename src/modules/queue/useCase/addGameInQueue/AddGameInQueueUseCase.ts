import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";
import { IRequestQueueDTO } from "@modules/queue/dtos/IRequestQueueDTO";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";

@injectable()
class AddGameInQueueUseCase {
  constructor(
    @inject("QueueRepository") private queueRepository: IQueueRepository,
    @inject("GamesRepository") private gamesRepository: IGamesRepository,
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository,
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute({
    court_id,
    players,
    modality_id,
  }: IRequestQueueDTO): Promise<void> {
    const date_now = dayjs();
    const start_time_game = dayjs(date_now).toDate();

    const courtExists = await this.courtsRepository.findById(court_id);

    if (!courtExists) {
      throw new AppError("A quadra não existe");
    }

    if (courtExists.status !== "ok") {
      throw new AppError("A quadra não está disponível para jogos");
    }

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

    const amoutPlayersInGameThisTime = findGame && findGame.players.length;

    if (amoutPlayersInGameThisTime > 0) {
      throw new AppError(
        "Todos ou alguns destes jogadores estão jogando ainda. Só podem entrar na lista de espera após o seu jogo terminar"
      );
    }

    await this.queueRepository.findPlayersInQueueGames(players);

    const amountplayerInQueue = playersInQueueGame && playersInQueueGame.length;

    if (amountplayerInQueue > 0) {
      throw new AppError(
        "Alguns ou todos estes jogadores, já estão na fila de espera para a próxima quadra livre"
      );
    }

    const stringPlayers = players.join(",");

    await this.queueRepository.create({
      court_id,
      players: stringPlayers,
      modality_id,
    });
  }
}

export { AddGameInQueueUseCase };
