import { inject, injectable } from "tsyringe";

import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";
import { Queue } from "@modules/queue/entities/Queue";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";

@injectable()
class ListQueueUseCase {
  constructor(
    @inject("QueueRepository") private queueRepository: IQueueRepository,
    @inject("MembersRepository") private membersRepository: IMembersRepository
  ) {}

  async execute(): Promise<Queue[]> {
    const list = await this.queueRepository.find();

    return list;
  }
}

export { ListQueueUseCase };
