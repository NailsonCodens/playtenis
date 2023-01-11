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

  update(data: ICreateCoachDTO): Promise<Coachs> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { CoachsRepositoryInMemory };
