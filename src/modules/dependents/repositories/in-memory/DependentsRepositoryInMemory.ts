import { ICreateDependentDTO } from "@modules/dependents/dtos/ICreateDependentDTO";

import { IDependentesRepository } from "../IDependentsRepository";

class DependentsRepositoryInMemory implements IDependentesRepository {
  create({ member_id, name }: ICreateDependentDTO) {
    throw new Error("Method not implemented.");
  }
}

export { DependentsRepositoryInMemory };
