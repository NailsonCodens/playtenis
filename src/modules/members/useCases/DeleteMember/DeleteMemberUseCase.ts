import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";

@injectable()
class DeleteMemberUseCase {
  constructor(
    @inject("MembersRepository")
    private membersRepository: IMembersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const memberAlredyExists = await this.membersRepository.findById(id);

    if (!memberAlredyExists) {
      throw new AppError(
        "Este membro não existe, por tanto não pode ser deletado"
      );
    }

    await this.membersRepository.delete(id);
  }
}

export { DeleteMemberUseCase };
