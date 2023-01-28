import { Members } from "@modules/members/entities/Members";

import { ICreateMemberDTO } from "../dtos/ICreateMemberDTO";

interface IMembersRepository {
  create(data: ICreateMemberDTO): Promise<Members>;
  findById(id: string, type?: string): Promise<Members>;
  findByName(name: string, type?: string): Promise<Members>;
  findByRegistration(registration: string): Promise<Members>;
  findByIds(ids: string[]): Promise<Members[]>;
  list(): Promise<Members[]>;
  update(data: ICreateMemberDTO): Promise<Members>;
  delete(id: string): Promise<void>;
}

export { IMembersRepository };
