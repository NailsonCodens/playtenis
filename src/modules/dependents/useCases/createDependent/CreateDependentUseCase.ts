import { AppError } from "@errors/AppError";
import { IDependentesRepository } from "@modules/dependents/repositories/IDependentsRepository";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

class CreateDependentUseCase {
  constructor(
    private dependentsRepository: IDependentesRepository,
    private memberRepository: IMembersRepository
  ) {}

  async execute({ name, member_id }): Promise<void> {
    const dependent = await this.dependentsRepository.findByName(name);

    if (dependent) {
      throw new AppError("Este dependente já existe");
    }

    const member = await this.memberRepository.findById(member_id);

    if (!member) {
      throw new AppError(
        "Este associado não existe, por tanto não é possível cadastrar um dependente a ele"
      );
    }

    this.dependentsRepository.create({ name, member_id });
  }
}

export { CreateDependentUseCase };
