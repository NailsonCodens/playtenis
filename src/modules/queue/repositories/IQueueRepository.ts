import { Queue } from "@modules/queue/entities/Queue";

import { ICreateQueueDTO } from "../dtos/ICreateQueueDTO";

interface IQueueRepository {
  create(data: ICreateQueueDTO): Promise<void>;
  findPlayersInQueueGames(players: Array<string>): Promise<Queue[]>;
  findQueueByPlayers(players: string): Promise<Queue>;
  find(): Promise<Queue[]>;
}

export { IQueueRepository };
