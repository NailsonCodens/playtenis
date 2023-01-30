import { inject, injectable } from "tsyringe";

import { Queue } from "@modules/queue/entities/Queue";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";

@injectable()
class ListQueueByPlayersUseCase {
  constructor(
    @inject("QueueRepository") private queueRepository: IQueueRepository
  ) {}

  async execute(players: string): Promise<Queue> {
    const queue = await this.queueRepository.findQueueByPlayers(players);

    return queue;
  }
}

export { ListQueueByPlayersUseCase };
