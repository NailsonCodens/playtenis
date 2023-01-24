import { Dependents } from "@modules/dependents/entities/Dependents";

import { ICreateDependentDTO } from "../dtos/ICreateDependentDTO";

interface IDependentesRepository {
  create(data: ICreateDependentDTO): Promise<void>;
  findByName(name: string): Promise<Dependents>;
  list(member_id: string): Promise<Dependents[]>;
}

export { IDependentesRepository };
