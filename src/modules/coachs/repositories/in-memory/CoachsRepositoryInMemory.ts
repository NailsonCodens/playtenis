import { ICreateCoachDTO } from "@modules/coachs/dtos/ICreateCoachDTO";
import { Coachs } from "@modules/coachs/entities/Coachs";
import { ICoachsRepository } from "@modules/coachs/repositories/ICoachsRepository";

class CoachsRepositoryInMemory implements ICoachsRepository {
  private coachs: Coachs[] = [];

  async findById(id: string): Promise<Coachs> {
    const coach = this.coachs.find((coach) => coach.id === id);

    return coach;
  }

  async findByName(name: string): Promise<Coachs> {
    const coach = this.coachs.find((coach) => coach.name === name);

    return coach;
  }

  async list(): Promise<Coachs[]> {
    return this.coachs;
  }

  async create({ name }: ICreateCoachDTO): Promise<void> {
    const coach = new Coachs();

    Object.assign(coach, {
      name,
    });

    this.coachs.push(coach);
  }

  async update({ id, name }: ICreateCoachDTO): Promise<Coachs> {
    const coach = this.coachs.findIndex((coach) => coach.id === id);

    this.coachs[coach].name = name;

    const coachUpdated = this.coachs.find((coach) => coach.id === id);

    return coachUpdated;
  }

  async delete(id: string): Promise<void> {
    const coachIndex = this.coachs.findIndex((coach) => coach.id === id);
    this.coachs.splice(coachIndex, 1);
  }
}

export { CoachsRepositoryInMemory };
