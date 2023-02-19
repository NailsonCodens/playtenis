import { inject, injectable } from "tsyringe";

import { Members } from "@modules/members/entities/Members";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

@injectable()
class ListMembersByIdsUseCase {
  constructor(
    @inject("MembersRepository") private membersRepository: IMembersRepository
  ) {}

  async execute(ids: string[]): Promise<Members[]> {
    const players = await this.membersRepository.findByIds(ids);

    return players;
  }
}

export { ListMembersByIdsUseCase };
