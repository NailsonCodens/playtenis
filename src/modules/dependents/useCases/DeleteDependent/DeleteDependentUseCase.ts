import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IDependentsRepository } from "@modules/dependents/repositories/IDependentsRepository";

@injectable()
class DeleteDependentUseCase {
  constructor(
    @inject("DependentsRepository")
    private dependentRepository: IDependentsRepository
  ) {}

  async execute(id: string) {
    const dependentAlredyExists = await this.dependentRepository.findById(id);

    if (!dependentAlredyExists) {
      throw new AppError(
        "Este dependente não existe, por tanto não pode ser deletado"
      );
    }

    await this.dependentRepository.delete(id);
  }
}

export { DeleteDependentUseCase };
