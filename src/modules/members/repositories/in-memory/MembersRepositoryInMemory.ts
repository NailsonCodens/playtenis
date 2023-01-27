import { ICreateMemberDTO } from "@modules/members/dtos/ICreateMemberDTO";
import { Members } from "@modules/members/entities/Members";

import { IMembersRepository } from "../IMembersRepository";

class MembersRepositoryInMemory implements IMembersRepository {
  async create({
    name,
    registration,
    status,
    type,
  }: ICreateMemberDTO): Promise<Members> {
    const member = new Members();
    Object.assign(member, {
      name,
      registration,
      status,
      type,
    });

    this.members.push(member);

    return member;
  }

  private members: Members[] = [];

  async findById(id: string, type = "member" as string): Promise<Members> {
    return this.members.find(
      (member) => member.id === id && member.type === type
    );
  }

  async findByName(name: string, type = "member" as string): Promise<Members> {
    return this.members.find(
      (member) => member.name === name && member.type === type
    );
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

  async delete(id: string): Promise<void> {
    const memberIndex = this.members.findIndex((member) => member.id === id);

    this.members.splice(memberIndex, 1);
  }
}

export { MembersRepositoryInMemory };
