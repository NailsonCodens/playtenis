import { inject, injectable } from "tsyringe";

import { ICreateMemberDTO } from "@modules/members/dtos/ICreateMemberDTO";
import { Members } from "@modules/members/entities/Members";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

import { AppError } from "../../../../errors/AppError";

@injectable()
class UpdateMemberUseCase {
  constructor(
    @inject("MembersRepository") private membersRepository: IMembersRepository
  ) {}

  async execute({
    id,
    name,
    registration,
    status,
  }: ICreateMemberDTO): Promise<Members> {
    const member = await this.membersRepository.findById(id);

    if (!member) {
      throw new AppError("Este membro não existe");
    }

    const memberUpdated = await this.membersRepository.update({
      id,
      name,
      registration,
      status,
    });

    return memberUpdated;
  }
}

export { UpdateMemberUseCase };
