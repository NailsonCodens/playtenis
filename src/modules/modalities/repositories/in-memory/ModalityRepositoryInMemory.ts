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

  async list(): Promise<Modalities[]> {
    return this.modalities;
  }

  async findByName(name: string): Promise<Modalities> {
    const modality = await this.modalities.find(
      (modality) => modality.name === name
    );

    return modality;
  }

  async findById(id: string): Promise<Modalities> {
    const modality = await this.modalities.find(
      (modality) => modality.id === id
    );

    return modality;
  }

  async update({
    id,
    name,
    amount_players,
    time,
    status,
  }: ICreateModalityDTO): Promise<Modalities> {
    const modalityBefore = this.modalities.find(
      (modality) => modality.id === id
    );

    Object.assign(modalityBefore, {
      name,
      amount_players,
      time,
      status,
    });

    const modality = this.modalities.findIndex(
      (modality) => modality.id === id
    );

    this.modalities[modality] = modalityBefore;

    const modalityAfter = this.modalities.find(
      (modality) => modality.id === id
    );

    return modalityAfter;
  }

  async delete(id: string): Promise<void> {
    const modalityToDelete = this.modalities.findIndex(
      (modality) => modality.id === id
    );

    this.modalities.splice(modalityToDelete, 1);
  }
}

export { ModalityRepositoryInMemory };
