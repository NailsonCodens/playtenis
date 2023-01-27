import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICreateMemberDependentDTO } from "@modules/dependents/dtos/ICreateMemberDependentDTO";
import { IDependentsRepository } from "@modules/dependents/repositories/IDependentsRepository";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

@injectable()
class CreateDependentUseCase {
  constructor(
    @inject("DependentsRepository")
    private dependentsRepository: IDependentsRepository,
    @inject("MembersRepository")
    private memberRepository: IMembersRepository
  ) {}

  async execute({
    name,
    registration,
    status,
    member_id,
  }: ICreateMemberDependentDTO): Promise<void> {
    const type = "dependent";

    const dependent = await this.memberRepository.findByName(name, type);

    if (dependent) {
      throw new AppError("Este dependente já existe");
    }

    const member = await this.memberRepository.findById(member_id);

    if (!member) {
      throw new AppError(
        "Este associado não existe, por tanto não é possível cadastrar um dependente a ele"
      );
    }

    const dependentPlayer = await this.memberRepository.create({
      name,
      registration,
      status,
      type: "dependent",
    });

    const player_id = dependentPlayer.id;

    this.dependentsRepository.create({ member_id, player_id });
  }
}

export { CreateDependentUseCase };
