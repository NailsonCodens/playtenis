import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICreateDependentDTO } from "@modules/dependents/dtos/ICreateDependentDTO";
import { Dependents } from "@modules/dependents/entities/Dependents";
import { IDependentsRepository } from "@modules/dependents/repositories/IDependentsRepository";
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
    member_id,
  }: ICreateDependentDTO): Promise<Dependents> {
    const depedentAlredyExists = await this.depentsRepository.findById(id);

    if (!depedentAlredyExists) {
      throw new AppError("Este dependente não existe");
    }

    const memberAlredyExists = await this.membersRepository.findById(member_id);

    if (!memberAlredyExists) {
      throw new AppError("Este membro do clube não existe");
    }

    const depedentUpdated = await this.depentsRepository.update({
      id,
      name,
      member_id,
    });

    return depedentUpdated;
  }
}

export { UpdateDependentUseCase };
