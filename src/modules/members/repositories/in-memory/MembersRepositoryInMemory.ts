import { ICreateMemberDTO } from "@modules/members/dtos/ICreateMemberDTO";
import { Members } from "@modules/members/entities/Members";

import { IMembersRepository } from "../IMembersRepository";

class MembersRespositoryInMemory implements IMembersRepository {
  private members: Members[] = [];

  async create({
    name,
    registration,
    status,
  }: ICreateMemberDTO): Promise<void> {
    const member = new Members();

    Object.assign(member, {
      name,
      registration,
      status,
    });

    this.members.push(member);
  }
  findById(id: string): Promise<Members> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<Members> {
    return this.members.find((member) => member.name === name);
  }

  async findByRegistration(registration: string): Promise<Members> {
    return this.members.find((member) => member.registration === registration);
  }

  list(): Promise<Members[]> {
    throw new Error("Method not implemented.");
  }
  update(data: ICreateMemberDTO): Promise<Members> {
    throw new Error("Method not implemented.");
  }
}

export { MembersRespositoryInMemory };
