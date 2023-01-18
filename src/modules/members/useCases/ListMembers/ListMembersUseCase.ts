import { Members } from "@modules/members/entities/Members";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

class ListMembersUseCase {
  constructor(private membersRepository: IMembersRepository) {}

  async execute(): Promise<Members[]> {
    const members = await this.membersRepository.list();

    return members;
  }
}

export { ListMembersUseCase };
