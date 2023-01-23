import { Dependentes } from "@modules/dependents/entities/Dependents";

import { ICreateDependentDTO } from "../dtos/ICreateDependentDTO";

interface IDependentesRepository {
  create(data: ICreateDependentDTO): Promise<void>;
  findByName(name: string): Promise<Dependentes>;
}

export { IDependentesRepository };
