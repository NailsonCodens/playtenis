import { ICreateModalityDTO } from "../dtos/ICreateModalityDTO";
import { Modalities } from "../entities/Modalities";
import { IModalitiesRepository } from "./IModalitiesRepository";

class ModalitiesRepository implements IModalitiesRepository {
  private modalities: Modalities[];

  constructor() {
    this.modalities = [];
  }

  async create({
    name,
    amount_players,
    time,
    status,
  }: ICreateModalityDTO): Promise<void> {
    const modality = new Modalities();

    Object.assign(modality, {
      name,
      amount_players,
      time,
      status,
    });

    this.modalities.push(modality);
  }
  list(): Modalities[] {
    return this.modalities;
  }
}

export { ModalitiesRepository };
