import { ICreateDependentDTO } from "@modules/dependents/dtos/ICreateDependentDTO";
import { Dependentes } from "@modules/dependents/entities/Dependents";

import { IDependentesRepository } from "../IDependentsRepository";

class DependentsRepositoryInMemory implements IDependentesRepository {
  private dependents: Dependentes[] = [];

  async create({ member_id, name }: ICreateDependentDTO): Promise<void> {
    const dependent = new Dependentes();

    Object.assign(dependent, {
      name,
      member_id,
    });

    this.dependents.push(dependent);
  }

  async findByName(name: string): Promise<Dependentes> {
    const dependent = this.dependents.find(
      (dependent) => dependent.name === name
    );

    return dependent;
  }
}

export { DependentsRepositoryInMemory };
