import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Members } from "@modules/members/entities/Members";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

@injectable()
class ListMemberByRegistrationUseCase {
  constructor(
    @inject("MembersRepository") private membersRepository: IMembersRepository
  ) {}

  async execute(registration: string): Promise<Members> {
    const members = await this.membersRepository.findByRegistration(
      registration
    );

    if (!members) {
      throw new AppError("Este associado não existe, verifique sua matrícula");
    }

    return members;
  }
}

export { ListMemberByRegistrationUseCase };
