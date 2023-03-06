import { Members } from "@modules/members/entities/Members";

import { ICreateMemberDTO } from "../dtos/ICreateMemberDTO";

interface IMembersRepository {
  create(data: ICreateMemberDTO): Promise<Members>;
  findById(id: string, type?: string): Promise<Members>;
  findByName(name: string, type?: string): Promise<Members>;
  findByRegistration(registration: string): Promise<Members>;
  findByIdNoRelation(id: string, type?: string): Promise<Members>;
  findByIds(ids: string[]): Promise<Members[]>;
  list(
    perPage: number,
    page: number,
    order: string,
    search: string
  ): Promise<[Members[], number]>;
  update(data: ICreateMemberDTO): Promise<Members>;
  delete(id: string): Promise<void>;
}

export { IMembersRepository };
