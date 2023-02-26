import { inject, injectable } from "tsyringe";

import { Queue } from "@modules/queue/entities/Queue";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";
import { socketio } from "@shared/socket.io";

import { AppError } from "../../../../errors/AppError";

@injectable()
class UpdateQueueIsPlayedUseCase {
  constructor(
    @inject("QueueRepository") private queueRepository: IQueueRepository
  ) {}

  async execute(id: string): Promise<Queue> {
    const queueExists = await this.queueRepository.findByIdIsPlayedNo(id);

    if (!queueExists) {
      throw new AppError(
        "Não este nenhum registro na fila de espera com estes dados"
      );
    }

    const queue = await this.queueRepository.updatedIsPlayed(id);
    socketio.emit("reloadApp", "Atualizou a fila de espera");

    return queue;
  }
}

export { UpdateQueueIsPlayedUseCase };
