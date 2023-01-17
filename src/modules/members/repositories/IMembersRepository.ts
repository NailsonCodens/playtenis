import { ICreateMemberDTO } from "../dtos/ICreateMemberDTO";
import { Members } from "../entities/Members";

interface IMembersRepository {
  create(data: ICreateMemberDTO): Promise<void>;
  findById(id: string): Promise<Members>;
  findByName(name: string): Promise<Members>;
  list(): Promise<Members[]>;
  update(data: ICreateMemberDTO): Promise<Members>;
}

export { IMembersRepository };
