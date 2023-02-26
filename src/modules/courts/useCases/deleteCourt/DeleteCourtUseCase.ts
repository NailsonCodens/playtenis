import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { socketio } from "@shared/socket.io";

@injectable()
class DeleteCourtUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository
  ) {}

  async execute({ id }): Promise<void> {
    const courtAlredyExists = await this.courtsRepository.findById(id);

    if (!courtAlredyExists) {
      throw new AppError("Esta quadra não existe");
    }

    await this.courtsRepository.delete(id);
    socketio.emit("reloadApp", "Deletou a quadra");
  }
}

export { DeleteCourtUseCase };
