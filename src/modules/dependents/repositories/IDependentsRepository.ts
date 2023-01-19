import { ICreateDependentDTO } from "../dtos/ICreateDependentDTO";

interface IDependentesRepository {
  create(data: ICreateDependentDTO);
}

export { IDependentesRepository };
