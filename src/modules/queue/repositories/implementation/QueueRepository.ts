import { In, LessThan, Like, MoreThan, Repository } from "typeorm";

import { AppDataSource } from "@database/data-source";
import { ICreateQueueDTO } from "@modules/queue/dtos/ICreateQueueDTO";
import { Queue } from "@modules/queue/entities/Queue";

import { IQueueRepository } from "../IQueueRepository";

class QueueRepository implements IQueueRepository {
  private repository: Repository<Queue>;

  constructor() {
    this.repository = AppDataSource.getRepository(Queue);
  }

  async create({
    modality_id,
    court_id,
    players,
  }: ICreateQueueDTO): Promise<void> {
    const gameQueue = this.repository.create({
      modality_id,
      court_id,
      players,
    });

    await this.repository.save(gameQueue);
  }

  async findPlayersInQueueGames(
    players: Array<string>,
    date_start_game: Date
  ): Promise<Queue[]> {
    const playersRaw = players.map((player) => `players LIKE '%${player}%'`);

    const teste = playersRaw.join(" OR ");

    const playersInQueue = await AppDataSource.getRepository(Queue)
      .createQueryBuilder("queue")
      .where(teste)
      .where("played = 'no'")
      .where("created_at ")
      .getMany();

    return playersInQueue;
  }
}

export { QueueRepository };
