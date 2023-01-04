import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database/data-source";
import { ICreateModalityDTO } from "../../dtos/ICreateModalityDTO";
import { Modalities } from "../../entities/Modalities";
import { IModalitiesRepository } from "../IModalitiesRepository";

class ModalitiesRespository implements IModalitiesRepository {
  private repository: Repository<Modalities>;

  constructor() {
    this.repository = AppDataSource.getRepository(Modalities);
  }

  async list(): Promise<Modalities[]> {
    const modalities = await this.repository.find();
    return modalities;
  }

  async findByName(name): Promise<Modalities> {
    const modality = await this.repository.findOneBy({ name });
    return modality;
  }

  async findById(id: string): Promise<Modalities> {
    const modality = await this.repository.findOneBy({ id });
    return modality;
  }

  async create({
    name,
    amount_players,
    time,
    status,
  }: ICreateModalityDTO): Promise<void> {
    const modality = this.repository.create({
      name,
      amount_players,
      time,
      status,
    });

    await this.repository.save(modality);
  }

  async update({
    id,
    name,
    amount_players,
    time,
    status,
  }: ICreateModalityDTO): Promise<Modalities> {
    await this.repository.update(id, {
      name,
      amount_players,
      time,
      status,
    });

    const updatedModality = await this.repository.findOneBy({ id });

    return updatedModality;
  }

  async delete(id: string): Promise<void> {
    console.log(id);
  }
}

export { ModalitiesRespository };
