import { inject, injectable } from "tsyringe";

import { Members } from "@modules/members/entities/Members";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

@injectable()
class ListMembersUseCase {
  constructor(
    @inject("MembersRepository") private membersRepository: IMembersRepository
  ) {}

  async execute(
    perPage: number,
    page: number,
    order: string,
    search: string
  ): Promise<[Members[], number]> {
    const members = await this.membersRepository.list(
      perPage,
      page,
      order,
      search
    );

    return members;
  }
}

export { ListMembersUseCase };
