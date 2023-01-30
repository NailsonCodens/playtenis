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

  async findPlayersInQueueGames(players: Array<string>): Promise<Queue[]> {
    const playersRaw = players.map((player) => `players LIKE '%${player}%'`);

    const condition = playersRaw.join(" OR ");

    const playersInQueue = await AppDataSource.getRepository(Queue)
      .createQueryBuilder("queue")
      .where(condition)
      .where("played = 'no'")
      .getMany();

    return playersInQueue;
  }

  async find(): Promise<Queue[]> {
    const all = await this.repository.find({
      where: {
        played: "no",
      },
      order: {
        id: "ASC",
      },
    });

    return all;
  }
}

export { QueueRepository };
