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
  }: ICreateMemberDTO): Promise<void> {
    const memberAlreadyWithRegistration =
      await this.memberRepository.findByRegistration(registration);

    if (memberAlreadyWithRegistration) {
      throw new AppError("Este associado já existe!");
    }

    const memberAlreadyWithName = await this.memberRepository.findByName(name);

    if (memberAlreadyWithName) {
      throw new AppError("um associado já existe com este nome!");
    }

    this.memberRepository.create({ name, registration, status });
  }
}

export { CreateMemberUseCase };
