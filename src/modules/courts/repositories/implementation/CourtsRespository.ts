import { ICourtDTO } from "../../dtos/ICourtDTO";
import { Courts } from "../../entities/Courts";
import { ICourtsRepository } from "../ICourtsRepository";

class CourtsRepository implements ICourtsRepository {
  private courts: Courts[];

  constructor() {
    this.courts = [];
  }

  async findById(id: string): Promise<Courts> {
    const court = this.courts.find((court) => court.id === id);
    return court;
  }

  async findByName(name: string): Promise<Courts> {
    const court = this.courts.find((court) => court.name === name);
    return court;
  }

  async all(): Promise<Courts[]> {
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

  async update({ id, name, status }: ICourtDTO): Promise<void> {
    const court = this.findById(id);

    Object.assign(court, {
      name,
      status,
      updated_at: new Date(),
    });
  }
}

export { CourtsRepository };
