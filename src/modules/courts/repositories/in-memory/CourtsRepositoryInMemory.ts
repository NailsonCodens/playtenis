import { ICourtDTO } from "@modules/courts/dtos/ICourtDTO";
import { Courts } from "@modules/courts/entities/Courts";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";

class CourtsRepositoryInMemory implements ICourtsRepository {
  private courts: Courts[] = [];

  async findById(id: string): Promise<Courts> {
    const court = this.courts.find((court) => court.id === id);

    return court;
  }

  async findByName(name: string): Promise<Courts> {
    const court = this.courts.find((court) => court.name === name);

    return court;
  }

  async list(): Promise<Courts[]> {
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

  async update({ id, name, status }: ICourtDTO): Promise<Courts> {
    const courtUpdated = new Courts();

    Object.assign(courtUpdated, {
      name,
      status,
    });

    const courtIndex = this.courts.findIndex((court) => court.id === id);

    this.courts[courtIndex] = courtUpdated;

    return courtUpdated;
  }

  async delete(id: string): Promise<void> {
    const courtIndex = this.courts.findIndex((court) => court.id === id);

    this.courts.splice(courtIndex, 1);
  }
}

export { CourtsRepositoryInMemory };
