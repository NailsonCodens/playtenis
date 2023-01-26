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

  async findById(id: string): Promise<Dependents> {
    const dependent = await this.repository.findOneBy({ id });
    return dependent;
  }

  async update({
    id,
    name,
    member_id,
  }: ICreateDependentDTO): Promise<Dependents> {
    await this.repository.update(id, {
      name,
      member_id,
    });

    const depedent = await this.repository.findOneBy({ id });

    return depedent;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
export { DependentsRepository };
