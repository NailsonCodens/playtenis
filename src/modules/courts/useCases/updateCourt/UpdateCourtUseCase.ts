import { inject, injectable } from "tsyringe";

import { Courts } from "@modules/courts/entities/Courts";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";

@injectable()
class UpdateCourtUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository
  ) {}

  async execute({ id, name, status }): Promise<Courts> {
    const courtAlredyExistsWithId = await this.courtsRepository.findById(id);

    if (!courtAlredyExistsWithId) {
      throw new Error("Esta quadra não existe");
    }

    const courtAlredyExistsWithName = await this.courtsRepository.findByName(
      name
    );

    if (courtAlredyExistsWithName !== null) {
      if (courtAlredyExistsWithName.id !== id) {
        throw new Error("Já existe uma outra quadra com este nome");
      }
    }

    const court = await this.courtsRepository.update({ id, name, status });

    return court;
  }
}

export { UpdateCourtUseCase };
