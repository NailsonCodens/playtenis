import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Coachs } from "@modules/coachs/entities/Coachs";
import { ICoachsRepository } from "@modules/coachs/repositories/ICoachsRepository";

@injectable()
class ListCoachByIdUseCase {
  constructor(
    @inject("CoachsRepository") private coachsRepository: ICoachsRepository
  ) {}

  async execute(id: string): Promise<Coachs> {
    const coach = await this.coachsRepository.findById(id);

    if (!coach) {
      throw new AppError("Este professor não existe");
    }

    return coach;
  }
}

export { ListCoachByIdUseCase };
