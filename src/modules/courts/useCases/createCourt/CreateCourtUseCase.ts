import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICourtDTO } from "@modules/courts/dtos/ICourtDTO";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { socketio } from "@shared/socket.io";

@injectable()
class CreateCourtUseCase {
  constructor(
    @inject("CourtsRepository")
    private courtsRepository: ICourtsRepository
  ) {}

  async execute({ name, status }: ICourtDTO): Promise<void> {
    const courtAlredyExists = await this.courtsRepository.findByName(name);

    if (courtAlredyExists) {
      throw new AppError("Esta quadra já está cadastrada.");
    }

    this.courtsRepository.create({ name, status });
    socketio.emit("reloadApp", "Casdastrou a quadra");
  }
}

export { CreateCourtUseCase };
