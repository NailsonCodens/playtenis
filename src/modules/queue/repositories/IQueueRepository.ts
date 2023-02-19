import { Queue } from "@modules/queue/entities/Queue";

import { ICreateQueueDTO } from "../dtos/ICreateQueueDTO";

interface IQueueRepository {
  findById(id: string): Promise<Queue>;
  create(data: ICreateQueueDTO): Promise<void>;
  findPlayersInQueueGames(players: string[]): Promise<Queue>;
  findQueueByPlayers(players: string[]): Promise<Queue>;
  find(): Promise<Queue[]>;
  findByIdIsPlayedNo(id: string): Promise<Queue>;
  updatedIsPlayed(id: string): Promise<Queue>;
}

export { IQueueRepository };
