import { ICourtDTO } from "../dtos/ICourtDTO";
import { Courts } from "../entities/Courts";

interface ICourtsRepository {
  findById(id: string): Promise<Courts>;
  findByName(name: string): Promise<Courts>;
  list(): Promise<Courts[]>;
  create({ name }: ICourtDTO): Promise<void>;
  update({ id, name }: ICourtDTO): Promise<Courts>;
  delete(id: string): Promise<void>;
}

export { ICourtsRepository };
