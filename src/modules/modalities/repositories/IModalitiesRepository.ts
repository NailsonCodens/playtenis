import { ICreateModalityDTO } from "../dtos/ICreateModalityDTO";
import { Modalities } from "../entities/Modalities";

interface IModalitiesRepository {
  create(data: ICreateModalityDTO): Promise<void>;
  list(): Promise<Modalities[]>;
}

export { IModalitiesRepository };
