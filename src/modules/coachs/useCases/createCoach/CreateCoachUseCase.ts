import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICreateCoachDTO } from "@modules/coachs/dtos/ICreateCoachDTO";
import { ICoachsRepository } from "@modules/coachs/repositories/ICoachsRepository";

@injectable()
class CreateCoachUseCase {
  constructor(
    @inject("CoachsRepository") private coachsRepository: ICoachsRepository
  ) {}

  async execute({ name }: ICreateCoachDTO): Promise<void> {
    const user = await this.coachsRepository.findByName(name);

    if (user) {
      throw new AppError("Este professor já existe");
    }

    await this.coachsRepository.create({ name });
  }
}

export { CreateCoachUseCase };
