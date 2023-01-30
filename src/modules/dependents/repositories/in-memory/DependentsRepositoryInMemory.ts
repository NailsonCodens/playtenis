import { ICreateDependentDTO } from "@modules/dependents/dtos/ICreateDependentDTO";
import { Dependents } from "@modules/dependents/entities/Dependents";

import { IDependentsRepository } from "../IDependentsRepository";

class DependentsRepositoryInMemory implements IDependentsRepository {
  private dependents: Dependents[] = [];

  async create({
    member_id,
    player_id,
  }: ICreateDependentDTO): Promise<Dependents> {
    const dependent = new Dependents();

    Object.assign(dependent, {
      player_id,
      member_id,
    });

    this.dependents.push(dependent);

    return dependent;
  }

  async findById(id: string): Promise<Dependents> {
    const dependent = this.dependents.find((dependent) => dependent.id === id);

    return dependent;
  }

  async list(member_id: string): Promise<Dependents[]> {
    const dependents = this.dependents.filter(
      (dependent) => dependent.member_id === member_id
    );

    return dependents;
  }

  async delete(id: string): Promise<void> {
    const dependentIndex = this.dependents.findIndex(
      (dependent) => dependent.id === id
    );

    this.dependents.splice(dependentIndex, 1);
  }
}

export { DependentsRepositoryInMemory };
