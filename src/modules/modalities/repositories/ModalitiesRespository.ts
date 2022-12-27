import { ICreateModalityDTO } from "../dtos/ICreateModalityDTO";
import { Modalities } from "../entities/Modalities";
import { IModalitiesRepository } from "./IModalitiesRepository";

class ModalitiesRepository implements IModalitiesRepository {
  private modalities: Modalities[];

  constructor() {
    this.modalities = [];
  }

  create(data: ICreateModalityDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  list(): Promise<Modalities[]> {
    throw new Error("Method not implemented.");
  }
}

export { ModalitiesRepository };
