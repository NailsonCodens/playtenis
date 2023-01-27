import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICreateMemberDTO } from "@modules/members/dtos/ICreateMemberDTO";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

@injectable()
class CreateMemberUseCase {
  constructor(
    @inject("MembersRepository") private memberRepository: IMembersRepository
  ) {}

  async execute({
    name,
    registration,
    status,
    type,
  }: ICreateMemberDTO): Promise<void> {
    const playerAlreadyWithRegistration =
      await this.memberRepository.findByRegistration(registration);

    if (playerAlreadyWithRegistration) {
      throw new AppError("Este associado já existe!");
    }

    const memberAlreadyWithName = await this.memberRepository.findByName(name);

    if (memberAlreadyWithName) {
      throw new AppError("um associado já existe com este nome!");
    }

    this.memberRepository.create({ name, registration, status, type });
  }
}

export { CreateMemberUseCase };
