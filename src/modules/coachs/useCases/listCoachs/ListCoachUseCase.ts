import { injectable, inject } from "tsyringe";

import { Coachs } from "../../entities/Coachs";
import { ICoachsRepository } from "../../repositories/ICoachsRepository";

@injectable()
class ListCoachUseCase {
  constructor(
    @inject("CoachsRepository") private coachsRepository: ICoachsRepository
  ) {}

  async execute(): Promise<Coachs[]> {
    const coachs = await this.coachsRepository.list();
    return coachs;
  }
}

export { ListCoachUseCase };
