import { Repository } from "typeorm";

import { AppDataSource } from "@database/data-source";
import { ICreateDependentDTO } from "@modules/dependents/dtos/ICreateDependentDTO";
import { Dependents } from "@modules/dependents/entities/Dependents";

import { IDependentesRepository } from "../IDependentsRepository";

class DependentsRepository implements IDependentesRepository {
  private repository: Repository<Dependents>;

  constructor() {
    this.repository = AppDataSource.getRepository(Dependents);
  }

  async list(member_id: string): Promise<Dependents[]> {
    const dependents = await this.repository.find({
      where: {
        member_id,
      },
    });
    return dependents;
  }

  async create({ member_id, name }: ICreateDependentDTO): Promise<void> {
    const dependent = this.repository.create({ member_id, name });

    await this.repository.save(dependent);
  }

  async findByName(name: string): Promise<Dependents> {
    const dependent = await this.repository.findOneBy({ name });
    return dependent;
  }
}
export { DependentsRepository };
