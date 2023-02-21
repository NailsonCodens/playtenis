import { inject, injectable } from "tsyringe";

import { Members } from "@modules/members/entities/Members";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

import { AppError } from "../../../../errors/AppError";

@injectable()
class ListMemberByIdUseCase {
  constructor(
    @inject("MembersRepository") private membersRepository: IMembersRepository
  ) {}

  async execute(id: string): Promise<Members> {
    const member = await this.membersRepository.findById(id);

    if (!member) {
      throw new AppError("Este sócio não existe ou está inativo");
    }

    return member;
  }
}

export { ListMemberByIdUseCase };
