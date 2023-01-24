import { ICreateDependentDTO } from "@modules/dependents/dtos/ICreateDependentDTO";
import { Dependents } from "@modules/dependents/entities/Dependents";

import { IDependentesRepository } from "../IDependentsRepository";

class DependentsRepositoryInMemory implements IDependentesRepository {
  private dependents: Dependents[] = [];

  async create({ member_id, name }: ICreateDependentDTO): Promise<void> {
    const dependent = new Dependents();

    Object.assign(dependent, {
      name,
      member_id,
    });

    this.dependents.push(dependent);
  }

  async findByName(name: string): Promise<Dependents> {
    const dependent = this.dependents.find(
      (dependent) => dependent.name === name
    );

    return dependent;
  }

  async list(member_id: string): Promise<Dependents> {
    return this.dependents;
  }
}

export { DependentsRepositoryInMemory };
