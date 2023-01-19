import { ICreateDependentDTO } from "@modules/dependents/dtos/ICreateDependentDTO";

import { IDependentesRepository } from "../IDependentsRepository";

class DependentsRepository implements IDependentesRepository {
  create(data: ICreateDependentDTO) {
    throw new Error("Method not implemented.");
  }
}
export { DependentsRepository };
