import { Queue } from "@modules/queue/entities/Queue";

import { ICreateQueueDTO } from "../dtos/ICreateQueueDTO";

interface IQueueRepository {
  create(data: ICreateQueueDTO): Promise<void>;
  findPlayersInQueueGames(players: Array<string>): Promise<Queue[]>;
}

export { IQueueRepository };
