import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Courts } from "@modules/courts/entities/Courts";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";

@injectable()
class ListCourtByIdUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository
  ) {}

  async execute(id: string): Promise<Courts> {
    const court = await this.courtsRepository.findById(id);

    if (!court) {
      throw new AppError("Esta quadra não existe");
    }

    return court;
  }
}

export { ListCourtByIdUseCase };
