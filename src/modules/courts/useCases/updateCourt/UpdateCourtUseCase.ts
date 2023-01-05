import { inject, injectable } from "tsyringe";

import { Courts } from "../../entities/Courts";
import { CourtsRepository } from "../../repositories/implementation/CourtsRespository";

@injectable()
class UpdateCourtUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: CourtsRepository
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
