import { In, Repository } from "typeorm";

import { AppDataSource } from "@database/data-source";
import { ICreateQueueDTO } from "@modules/queue/dtos/ICreateQueueDTO";
import { Queue } from "@modules/queue/entities/Queue";

import { IQueueRepository } from "../IQueueRepository";

class QueueRepository implements IQueueRepository {
  private repository: Repository<Queue>;

  constructor() {
    this.repository = AppDataSource.getRepository(Queue);
  }

  async create({ modality_id, players, id }: ICreateQueueDTO): Promise<void> {
    const queue = this.repository.create({
      id,
      modality_id,
      played: "no",
      players,
    });

    await this.repository.save(queue);
  }

  async findPlayersInQueueGames(players: string[]): Promise<Queue> {
    const playersInQueue = this.repository.findOne({
      relations: {
        players: true,
      },
      where: {
        players: {
          id: In(players),
        },
      },
    });

    return playersInQueue;
  }

  async findQueueByPlayers(players: string[]): Promise<Queue> {
    const playersInQueue = await this.repository.findOne({
      relations: {
        players: true,
      },
      where: {
        played: "no",
        players: {
          id: In(players),
        },
      },
      order: {
        id: "DESC",
      },
    });

    return playersInQueue;
  }

  async find(): Promise<Queue[]> {
    const all = await this.repository.find({
      relations: {
        players: true,
      },
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
    const queue = await this.repository.findOne({
      where: { id, played: "no" },
    });

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
