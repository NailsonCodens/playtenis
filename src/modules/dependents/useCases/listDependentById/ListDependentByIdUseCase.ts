import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IDependentsRepository } from "@modules/dependents/repositories/IDependentsRepository";
import { Members } from "@modules/members/entities/Members";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

@injectable()
class ListDendpendentByIdUseCase {
  constructor(
    @inject("DependentsRepository")
    private depentsRepository: IDependentsRepository,
    @inject("MembersRepository") private membersRepository: IMembersRepository
  ) {}

  async execute(id: string): Promise<Members> {
    const type = "dependent";

    const dependent = await this.membersRepository.findByIdNoRelation(id, type);
    console.log(dependent);
    if (!dependent) {
      throw new AppError("Este dependente não existe");
    }

    return dependent;
  }
}

export { ListDendpendentByIdUseCase };
