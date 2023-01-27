import { ICreateCoachDTO } from "../dtos/ICreateCoachDTO";
import { Coachs } from "../entities/Coachs";

interface ICoachsRepository {
  findById(id: string): Promise<Coachs>;
  findByName(name: string): Promise<Coachs>;
  findByRegistration(registration: string): Promise<Coachs>;
  list(): Promise<Coachs[]>;
  create(data: ICreateCoachDTO): Promise<void>;
  update(data: ICreateCoachDTO): Promise<Coachs>;
  delete(id: string): Promise<void>;
}

export { ICoachsRepository };
