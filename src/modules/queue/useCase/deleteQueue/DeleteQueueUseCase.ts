import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";
import { socketio } from "@shared/socket.io";

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
    socketio.emit("reloadApp", "Deletou a quadra");

    await this.queueRepository.delete(id);
  }
}

export { DeleteQueueUseCase };
