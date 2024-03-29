import { ILike, In, Repository } from "typeorm";

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
      relations: {
        dependents: true,
      },
    });
    return member;
  }

  async findByIdNoRelation(
    id: string,
    type = "member" as string
  ): Promise<Members> {
    const member = await this.repository.findOne({
      where: {
        id,
        type,
      },
    });
    return member;
  }

  async findByIds(ids: string[]): Promise<Members[]> {
    const members = await this.repository.find({
      where: {
        id: In(ids),
        status: "ok",
      },
    });

    return members;
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
    const member = await this.repository.findOne({
      relations: {
        dependents: true,
      },
      where: {
        registration,
      },
    });
    return member;
  }

  async list(
    perPage: number,
    page: number,
    order: string,
    search: string
  ): Promise<[Members[], number]> {
    console.log(search);

    const ppage = perPage > 0 ? perPage : 10;
    const pageM = page > 0 ? page : 1;

    const skip = ppage * pageM - ppage;

    const members = await this.repository.findAndCount({
      relations: {
        dependents: true,
      },
      where: [
        { type: "member", name: ILike(`%${search}%`) },
        {
          registration: ILike(`%${search}%`),
        },
      ],
      take: ppage,
      skip,
      order: {
        name: order === "asc" ? "asc" : "desc",
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
    await this.repository.softDelete(id);
  }
}

export { MembersRepository };
