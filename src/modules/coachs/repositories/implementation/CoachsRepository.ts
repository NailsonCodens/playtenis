import { AppDataSource } from "@database/data-source";
import { ICreateCoachDTO } from "@modules/coachs/dtos/ICreateCoachDTO";
import { Coachs } from "@modules/coachs/entities/Coachs";
import { Repository } from "typeorm";

import { ICoachsRepository } from "../ICoachsRepository";

class CoachsRepository implements ICoachsRepository {
  private repository: Repository<Coachs>;

  constructor() {
    this.repository = AppDataSource.getRepository(Coachs);
  }

  async findById(id: string): Promise<Coachs> {
    const coach = await this.repository.findOneBy({ id });
    return coach;
  }

  async findByName(name: string): Promise<Coachs> {
    const coach = await this.repository.findOneBy({ name });
    return coach;
  }

  async list(): Promise<Coachs[]> {
    const coachs = await this.repository.find();
    return coachs;
  }

  async create({ name }: ICreateCoachDTO): Promise<void> {
    const coach = this.repository.create({
      name,
    });

    await this.repository.save(coach);
  }

  async update({ id, name }: ICreateCoachDTO): Promise<Coachs> {
    await this.repository.update(id, { name });

    const coachUpdated = await this.repository.findOneBy({ id });

    return coachUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { CoachsRepository };
