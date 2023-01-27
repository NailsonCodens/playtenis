import { Repository } from "typeorm";

import { AppDataSource } from "@database/data-source";
import { ICreateCoachDTO } from "@modules/coachs/dtos/ICreateCoachDTO";
import { Coachs } from "@modules/coachs/entities/Coachs";

import { ICoachsRepository } from "../ICoachsRepository";

class CoachsRepository implements ICoachsRepository {
  private repository: Repository<Coachs>;

  constructor() {
    this.repository = AppDataSource.getRepository(Coachs);
  }

  async findById(id: string): Promise<Coachs> {
    const coach = await this.repository.findOne({
      where: {
        id,
        type: "coach",
      },
    });
    return coach;
  }

  async findByName(name: string): Promise<Coachs> {
    const coach = await this.repository.findOne({
      where: {
        name,
        type: "coach",
      },
    });
    return coach;
  }

  async findByRegistration(registration: string): Promise<Coachs> {
    const coach = await this.repository.findOneBy({ registration });
    return coach;
  }

  async list(): Promise<Coachs[]> {
    const coachs = await this.repository.find({
      where: {
        type: "coach",
      },
    });
    return coachs;
  }

  async create({ name, registration, status }: ICreateCoachDTO): Promise<void> {
    const coach = this.repository.create({
      name,
      registration,
      status,
    });

    await this.repository.save(coach);
  }

  async update({
    id,
    name,
    registration,
    status,
  }: ICreateCoachDTO): Promise<Coachs> {
    await this.repository.update(id, { name, registration, status });

    const coachUpdated = await this.repository.findOneBy({ id });

    return coachUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { CoachsRepository };
