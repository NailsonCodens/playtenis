import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";

@injectable()
class DeleteQueueUseCase {
  constructor(
    @inject("QueueRepository") private queueRepository: IQueueRepository
  ) {}

  async execute(id: string) {
    const queue = await this.queueRepository.findById(id);

    if (!queue) {
      throw new AppError("Esta fila de espera não existe");
    }

    await this.queueRepository.delete(id);
  }
}

export { DeleteQueueUseCase };
