import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IDependentsRepository } from "@modules/dependents/repositories/IDependentsRepository";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

@injectable()
class DeleteDependentUseCase {
  constructor(
    @inject("DependentsRepository")
    private dependentRepository: IDependentsRepository,
    @inject("MembersRepository") private membersRepository: IMembersRepository
  ) {}

  async execute(id: string) {
    const type = "dependent";

    const dependentAlredyExists = await this.membersRepository.findById(
      id,
      type
    );

    if (!dependentAlredyExists) {
      throw new AppError(
        "Este dependente não existe, por tanto não pode ser deletado"
      );
    }

    await this.membersRepository.delete(id);

    //  await this.dependentRepository.delete(id);
  }
}

export { DeleteDependentUseCase };
