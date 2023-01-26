import { inject, injectable } from "tsyringe";

import { IDependentsRepository } from "@modules/dependents/repositories/IDependentsRepository";

@injectable()
class ListDependentsUseCase {
  constructor(
    @inject("DependentsRepository")
    private depedentsRepository: IDependentsRepository
  ) {}

  async execute(member_id: string) {
    const depedents = await this.depedentsRepository.list(member_id);

    return depedents;
  }
}

export { ListDependentsUseCase };
