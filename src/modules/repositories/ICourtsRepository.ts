import { Courts } from "../entities/Courts";
import { ICourtDTO } from "../useCases/courts/ICourtDTO";

interface ICourtsRepository {
  findById(id: string): Promise<Courts>;
  findByCourt(name: string): Promise<Courts>;
  all(): Promise<Courts[]>;
  create({ name }: ICourtDTO): Promise<void>;
  update({ id, name }: ICourtDTO): Promise<void>;
}

export { ICourtsRepository };
