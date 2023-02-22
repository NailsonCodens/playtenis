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

    const playersQueue = await this.membersRepository.findByIds(players);

    queueExists.players = playersQueue;

    await this.queueRepository.create(queueExists);
  }
}

export { AddPlayersInQueueUSeCase };
