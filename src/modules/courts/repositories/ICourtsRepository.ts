import { ICourtDTO } from "../dtos/ICourtDTO";
import { Courts } from "../entities/Courts";

interface ICourtsRepository {
  findById(id: string): Promise<Courts>;
  findByName(name: string): Promise<Courts>;
  all(): Promise<Courts[]>;
  create({ name }: ICourtDTO): Promise<void>;
  update({ id, name }: ICourtDTO): Promise<void>;
}

export { ICourtsRepository };
