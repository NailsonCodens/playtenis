import { Repository } from "typeorm";

import { AppDataSource } from "@database/data-source";
import { ICreateMemberDTO } from "@modules/members/dtos/ICreateMemberDTO";
import { Members } from "@modules/members/entities/Members";

import { IMembersRepository } from "../IMembersRepository";

class MembersRepository implements IMembersRepository {
  private repository: Repository<Members>;

  constructor() {
    this.repository = AppDataSource.getRepository(Members);
  }

  async create({
    name,
    registration,
    status,
  }: ICreateMemberDTO): Promise<void> {
    const member = await this.repository.create({
      name,
      registration,
      status,
    });

    this.repository.save(member);
  }

  async findById(id: string): Promise<Members> {
    const member = await this.repository.findOneBy({ id });
    return member;
  }

  async findByName(name: string): Promise<Members> {
    const member = await this.repository.findOneBy({ name });
    return member;
  }

  async findByRegistration(registration: string): Promise<Members> {
    const member = await this.repository.findOneBy({ registration });
    return member;
  }

  async list(): Promise<Members[]> {
    const members = await this.repository.find();
    return members;
  }
  async update({
    id,
    name,
    registration,
    status,
  }: ICreateMemberDTO): Promise<Members> {
    await this.repository.update(id, { name, registration, status });

    const memberUpdated = await this.repository.findOneBy({ id });

    return memberUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { MembersRepository };
