import { Repository } from "typeorm";

import { AppDataSource } from "@database/data-source";
import { ICreateQueueDTO } from "@modules/queue/dtos/ICreateQueueDTO";
import { Queue } from "@modules/queue/entities/Queue";

import { IQueueRepository } from "../IQueueRepository";

class QueueRepository implements IQueueRepository {
  private repository: Repository<Queue>;

  constructor() {
    this.repository = AppDataSource.getRepository(Queue);
  }

  async create({ modality_id, players }: ICreateQueueDTO): Promise<void> {
    const gameQueue = this.repository.create({
      modality_id,
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

  async findQueueByPlayers(players: string): Promise<Queue> {
    console.log(players);

    const playersInQueue = await this.repository.findOne({
      where: {
        players,
        played: "no",
      },
      order: {
        id: "DESC",
      },
    });

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

  async findById(id: string): Promise<Queue> {
    const queue = await this.repository.findOneBy({ id });

    return queue;
  }

  async findByIdIsPlayedNo(id: string): Promise<Queue> {
    const queue = await this.repository.findOne({
      where: {
        id,
        played: "no",
      },
    });

    return queue;
  }

  async updatedIsPlayed(id: string): Promise<Queue> {
    await this.repository.update(id, {
      played: "yes",
    });

    const court = await this.repository.findOneBy({ id });

    return court;
  }
}

export { QueueRepository };
