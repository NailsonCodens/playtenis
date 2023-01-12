import { inject, injectable } from "tsyringe";

import { ICreateCoachDTO } from "@modules/coachs/dtos/ICreateCoachDTO";
import { Coachs } from "@modules/coachs/entities/Coachs";
import { ICoachsRepository } from "@modules/coachs/repositories/ICoachsRepository";

@injectable()
class UpdateCoachUseCase {
  constructor(
    @inject("CoachsRepository") private coachRepository: ICoachsRepository
  ) {}

  async execute({ id, name }: ICreateCoachDTO): Promise<Coachs> {
    const coachAlredyExists = await this.coachRepository.findById(id);

    if (!coachAlredyExists) {
      throw new Error("Este professor não existe");
    }

    const coach = await this.coachRepository.update({ id, name });
    return coach;
  }
}

export { UpdateCoachUseCase };
