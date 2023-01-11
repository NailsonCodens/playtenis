import { AppDataSource } from "@database/data-source";
import { ICourtDTO } from "@modules/courts/dtos/ICourtDTO";
import { Courts } from "@modules/courts/entities/Courts";
import { Repository } from "typeorm";

import { ICourtsRepository } from "../ICourtsRepository";

class CourtsRepository implements ICourtsRepository {
  private repository: Repository<Courts>;

  constructor() {
    this.repository = AppDataSource.getRepository(Courts);
  }

  async list(): Promise<Courts[]> {
    const courts = await this.repository.find();
    return courts;
  }

  async findById(id: string): Promise<Courts> {
    const court = await this.repository.findOneBy({ id });
    return court;
  }

  async findByName(name: string): Promise<Courts> {
    const court = await this.repository.findOneBy({ name });
    return court;
  }

  async create({ name, status }: ICourtDTO): Promise<void> {
    const court = this.repository.create({
      name,
      status,
    });

    await this.repository.save(court);
  }

  async update({ id, name, status }: ICourtDTO): Promise<Courts> {
    await this.repository.update(id, {
      name,
      status,
    });

    const court = await this.repository.findOneBy({ id });

    return court;
  }

  async delete(id: string): Promise<void> {
    console.log(id);
  }
}

export { CourtsRepository };
