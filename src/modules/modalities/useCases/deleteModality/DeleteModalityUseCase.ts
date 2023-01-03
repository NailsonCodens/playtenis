import { inject, injectable } from "tsyringe";

import { ModalitiesRespository } from "../../repositories/implementations/ModalitiesRespository";

@injectable()
class DeleteModalityUseCase {
  constructor(
    @inject("ModalitiesRespository")
    private modalityRepository: ModalitiesRespository
  ) {}

  async execute({ id }): Promise<void> {
    const modalityAlredyExists = await this.modalityRepository.findById(id);

    if (!modalityAlredyExists) {
      throw new Error("Esta modalidade não existe e não pode ser deletada.");
    }

    await this.modalityRepository.delete(id);
  }
}

export { DeleteModalityUseCase };
