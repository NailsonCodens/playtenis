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
    type,
  }: ICreateMemberDTO): Promise<Members> {
    const member = this.repository.create({
      name,
      registration,
      status,
      type,
    });

    await this.repository.save(member);

    return member;
  }

  async findById(id: string, type = "member" as string): Promise<Members> {
    const member = await this.repository.findOne({
      where: {
        id,
        type,
      },
    });
    return member;
  }

  async findByName(name: string, type = "member" as string): Promise<Members> {
    const member = await this.repository.findOne({
      where: {
        name,
        type,
      },
    });
    return member;
  }

  async findByRegistration(registration: string): Promise<Members> {
    const member = await this.repository.findOneBy({ registration });
    return member;
  }

  async list(): Promise<Members[]> {
    const members = await this.repository.find({
      where: {
        type: "member",
      },
    });
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
