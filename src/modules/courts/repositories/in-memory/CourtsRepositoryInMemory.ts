import { Coachs } from "@modules/coachs/entities/Coachs";
import { ICoachsRepository } from "@modules/coachs/repositories/ICoachsRepository";
import { ICourtDTO } from "@modules/courts/dtos/ICourtDTO";
import { Courts } from "@modules/courts/entities/Courts";

class CourtsRepositoryInMemory implements ICoachsRepository {
  private courts: Courts[] = [];

  async findById(id: string): Promise<Coachs> {
    const court = await this.courts.find((court) => court.id === id);

    return court;
  }

  async findByName(name: string): Promise<Coachs> {
    const court = await this.courts.find((court) => court.name === name);

    return court;
  }

  async list(): Promise<Coachs[]> {
    return this.courts;
  }

  async create({ name, status }: ICourtDTO): Promise<void> {
    const court = new Courts();

    Object.assign(court, {
      name,
      status,
    });

    this.courts.push(court);
  }

  async update({ id, name, status }: ICourtDTO): Promise<Coachs> {
    const courtUpdated = new Courts();

    Object.assign(courtUpdated, {
      name,
      status,
    });

    const courtIndex = await this.courts.findIndex((court) => court.id === id);

    this.courts[courtIndex] = courtUpdated;

    return courtUpdated;
  }

  async delete(id: string): Promise<void> {
    const courtIndex = await this.courts.findIndex((court) => court.id === id);

    this.courts.splice(courtIndex, 1);
  }
}

export { CourtsRepositoryInMemory };
