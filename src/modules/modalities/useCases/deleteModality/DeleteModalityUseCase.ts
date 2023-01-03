import { inject, injectable } from "tsyringe";

import { ModalitiesRespository } from "../../repositories/implementations/ModalitiesRespository";

@injectable()
class DeleteModalityUseCase {
  constructor(
    @inject("ModalityRepositories")
    private modalityRepository: ModalitiesRespository
  ) {}

  async execute({ id }): Promise<void> {
    await this.modalityRepository.delete(id);
  }
}

export { DeleteModalityUseCase };
