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

  async list(): Promise<Modalities[]> {
    const modalities = await this.repository.find();
    return modalities;
  }

  async findByName(name): Promise<Modalities> {
    const modality = await this.repository.findOneBy({ name });
    return modality;
  }
}

export { ModalitiesRespository };
