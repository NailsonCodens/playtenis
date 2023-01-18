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
    const memberAlready = await this.memberRepository.findByRegistration(
      registration
    );

    if (memberAlready) {
      throw new AppError("Este associado já existe!");
    }

    this.memberRepository.create({ name, registration, status });
  }
}

export { CreateMemberUseCase };
