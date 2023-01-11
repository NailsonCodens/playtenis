import { ICreateModalityDTO } from "@modules/modalities/dtos/ICreateModalityDTO";
import { Modalities } from "@modules/modalities/entities/Modalities";

import { IModalitiesRepository } from "../IModalitiesRepository";

class ModalityRepositoryInMemory implements IModalitiesRepository {
  modalities: Modalities[] = [];

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
  list(): Promise<Modalities[]> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<Modalities> {
    const modality = await this.modalities.find(
      (modality) => modality.name === name
    );

    return modality;
  }

  findById(id: string): Promise<Modalities> {
    throw new Error("Method not implemented.");
  }
  update(data: ICreateModalityDTO): Promise<Modalities> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { ModalityRepositoryInMemory };
