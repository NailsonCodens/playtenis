import { injectable, inject } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICoachsRepository } from "@modules/coachs/repositories/ICoachsRepository";

@injectable()
class DeleteCoachUseCase {
  constructor(
    @inject("CoachsRepository") private coachsRepository: ICoachsRepository
  ) {}

  async execute({ id }): Promise<void> {
    const coachAlredyExists = await this.coachsRepository.findById(id);

    if (!coachAlredyExists) {
      throw new AppError(
        "Este professor não existe, por tanto não pode ser deletado"
      );
    }

    await this.coachsRepository.delete(id);
  }
}

export { DeleteCoachUseCase };
