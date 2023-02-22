import { inject, injectable } from "tsyringe";

import { Queue } from "@modules/queue/entities/Queue";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";

@injectable()
class ListQueueByIdUseCase {
  constructor(
    @inject("QueueRepository") private queueRepository: IQueueRepository
  ) {}

  async execute(id: string): Promise<Queue> {
    const queue = await this.queueRepository.findById(id);

    return queue;
  }
}

export { ListQueueByIdUseCase };
