import { inject, injectable } from "tsyringe";

import { Queue } from "@modules/queue/entities/Queue";
import { QueueRepository } from "@modules/queue/repositories/implementation/QueueRepository";

@injectable()
class ListQueueUseCase {
  constructor(
    @inject("QueueRepository") private queueRepository: QueueRepository
  ) {}

  async execute(): Promise<Queue[]> {
    const list = await this.queueRepository.find();

    return list;
  }
}

export { ListQueueUseCase };
