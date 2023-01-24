import { IDependentesRepository } from "@modules/dependents/repositories/IDependentsRepository";

class ListDependentsUseCase {
  constructor(private depedentsRepository: IDependentesRepository) {}

  async execute(member_id: string) {
    const depedents = await this.depedentsRepository.list(member_id);

    return depedents;
  }
}

export { ListDependentsUseCase };
