import { Dependents } from "@modules/dependents/entities/Dependents";

import { ICreateDependentDTO } from "../dtos/ICreateDependentDTO";

interface IDependentsRepository {
  create(data: ICreateDependentDTO): Promise<Dependents>;
  findById(id: string): Promise<Dependents>;
  list(member_id: string): Promise<Dependents[]>;
  delete(id: string): Promise<void>;
}

export { IDependentsRepository };
