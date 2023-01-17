import { ICreateMemberDTO } from "@modules/members/dtos/ICreateMemberDTO";
import { Members } from "@modules/members/entities/Members";

import { IMembersRepository } from "../IMembersRepository";

class MembersRepository implements IMembersRepository {
  create(data: ICreateMemberDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Members> {
    throw new Error("Method not implemented.");
  }
  findByName(name: string): Promise<Members> {
    throw new Error("Method not implemented.");
  }
  list(): Promise<Members[]> {
    throw new Error("Method not implemented.");
  }
  update(data: ICreateMemberDTO): Promise<Members> {
    throw new Error("Method not implemented.");
  }
}

export { MembersRepository };
