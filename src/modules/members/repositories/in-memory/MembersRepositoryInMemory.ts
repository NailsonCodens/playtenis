import { ICreateMemberDTO } from "@modules/members/dtos/ICreateMemberDTO";
import { Members } from "@modules/members/entities/Members";

import { IMembersRepository } from "../IMembersRepository";

class MembersRepositoryInMemory implements IMembersRepository {
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

  async findById(id: string): Promise<Members> {
    return this.members.find((member) => member.id === id);
  }

  async findByName(name: string): Promise<Members> {
    return this.members.find((member) => member.name === name);
  }

  async findByRegistration(registration: string): Promise<Members> {
    return this.members.find((member) => member.registration === registration);
  }

  async list(): Promise<Members[]> {
    return this.members;
  }

  async update({
    id,
    name,
    registration,
    status,
  }: ICreateMemberDTO): Promise<Members> {
    const newMember = new Members();

    Object.assign(newMember, {
      id,
      name,
      registration,
      status,
    });

    const member = this.members.findIndex((member) => member.id === id);

    this.members[member] = newMember;

    return newMember;
  }
}

export { MembersRepositoryInMemory };
