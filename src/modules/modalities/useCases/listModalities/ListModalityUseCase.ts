import { inject, injectable } from "tsyringe";

import { Modalities } from "../../entities/Modalities";
import { ModalitiesRespository } from "../../repositories/implementations/ModalitiesRespository";

@injectable()
class ListModalityUseCase {
  constructor(
    @inject("ModalitiesRespository")
    private modalitiesRepository: ModalitiesRespository
  ) {}

  async execute(): Promise<Modalities[]> {
    const modalities = await this.modalitiesRepository.list();

    return modalities;
  }
}

export { ListModalityUseCase };
