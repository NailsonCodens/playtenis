import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICreateCoachDTO } from "@modules/coachs/dtos/ICreateCoachDTO";
import { ICoachsRepository } from "@modules/coachs/repositories/ICoachsRepository";

@injectable()
class CreateCoachUseCase {
  constructor(
    @inject("CoachsRepository") private coachsRepository: ICoachsRepository
  ) {}

  async execute({
    name,
    registration,
    status,
  }: ICreateCoachDTO): Promise<void> {
    const playerAlreadyWithRegistration =
      await this.coachsRepository.findByRegistration(registration);

    if (playerAlreadyWithRegistration) {
      throw new AppError("Já existe um jogador cadastrado com esta matrícula!");
    }

    const coach = await this.coachsRepository.findByName(name);

    if (coach) {
      throw new AppError("Já existe um professor com este nome");
    }

    await this.coachsRepository.create({ name, registration, status });
  }
}

export { CreateCoachUseCase };
