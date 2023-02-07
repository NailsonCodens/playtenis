import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICreateMemberDependentDTO } from "@modules/dependents/dtos/ICreateMemberDependentDTO";
import { IDependentsRepository } from "@modules/dependents/repositories/IDependentsRepository";
import { Members } from "@modules/members/entities/Members";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

@injectable()
class UpdateDependentUseCase {
  constructor(
    @inject("DependentsRepository")
    private depentsRepository: IDependentsRepository,
    @inject("MembersRepository") private membersRepository: IMembersRepository
  ) {}
  async execute({
    id,
    name,
    registration,
    status,
    member_id,
  }: ICreateMemberDependentDTO): Promise<Members> {
    const type = "dependent";

    const depedentAlredyExists = await this.membersRepository.findById(
      id,
      type
    );

    if (!depedentAlredyExists) {
      throw new AppError("Este dependente não existe");
    }

    const memberAlredyExists = await this.membersRepository.findById(member_id);

    if (!memberAlredyExists) {
      throw new AppError("Este associado do clube não existe");
    }

    const depedentUpdated = await this.membersRepository.update({
      id,
      name,
      registration,
      status,
    });

    return depedentUpdated;
  }
}

export { UpdateDependentUseCase };
