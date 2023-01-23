import { ICreateDependentDTO } from "@modules/dependents/dtos/ICreateDependentDTO";
import { Dependentes } from "@modules/dependents/entities/Dependents";

import { IDependentesRepository } from "../IDependentsRepository";

class DependentsRepository implements IDependentesRepository {
  create(data: ICreateDependentDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findByName(name: string): Promise<Dependentes> {
    throw new Error("Method not implemented.");
  }
}
export { DependentsRepository };
