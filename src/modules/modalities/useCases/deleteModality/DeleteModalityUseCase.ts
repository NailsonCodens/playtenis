import { inject, injectable } from "tsyringe";

import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";

import { AppError } from "../../../../errors/AppError";

@injectable()
class DeleteModalityUseCase {
  constructor(
    @inject("ModalitiesRespository")
    private modalityRepository: IModalitiesRepository
  ) {}

  async execute({ id }): Promise<void> {
    const modalityAlredyExists = await this.modalityRepository.findById(id);

    if (!modalityAlredyExists) {
      throw new AppError("Esta modalidade não existe e não pode ser deletada.");
    }

    await this.modalityRepository.delete(id);
  }
}

export { DeleteModalityUseCase };
