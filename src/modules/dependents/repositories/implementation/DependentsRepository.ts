import { Repository } from "typeorm";

import { AppDataSource } from "@database/data-source";
import { ICreateDependentDTO } from "@modules/dependents/dtos/ICreateDependentDTO";
import { Dependents } from "@modules/dependents/entities/Dependents";

import { IDependentsRepository } from "../IDependentsRepository";

class DependentsRepository implements IDependentsRepository {
  private repository: Repository<Dependents>;

  constructor() {
    this.repository = AppDataSource.getRepository(Dependents);
  }

  async list(player_id: string): Promise<Dependents[]> {
    const dependents = await this.repository.find({
      relations: {
        member: true,
        player: true,
      },
      where: {
        player_id,
      },
    });
    return dependents;
  }

  async create({
    player_id,
    member_id,
  }: ICreateDependentDTO): Promise<Dependents> {
    const dependent = this.repository.create({
      player_id,
      member_id,
    });

    await this.repository.save(dependent);

    return dependent;
  }

  async findById(id: string): Promise<Dependents> {
    const dependent = await this.repository.findOneBy({ id });
    return dependent;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
export { DependentsRepository };
