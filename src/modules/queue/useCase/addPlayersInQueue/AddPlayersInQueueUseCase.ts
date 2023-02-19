import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";

import { AppError } from "../../../../errors/AppError";

@injectable()
class AddPlayersInQueueUSeCase {
  constructor(
    @inject("QueueRepository") private queueRepository: IQueueRepository,
    @inject("MembersRepository") private membersRepository: IMembersRepository,
    @inject("GamesRepository") private gamesRepository: IGamesRepository,
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute(queue_id: string, players: string[]): Promise<void> {
    const date_now = dayjs();
    const start_time_game = dayjs(date_now).toDate();

    const queueExists = await this.queueRepository.findById(queue_id);

    if (!queueExists) {
      throw new AppError("Esta fila de espera não existe ou já foi para jogo");
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

    const modalityGame = await this.modalitiesRepository.findById(
      queueExists.modality_id
    );

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

    queueExists.players = playersQueue;

    await this.queueRepository.create(queueExists);
  }
}

export { AddPlayersInQueueUSeCase };
