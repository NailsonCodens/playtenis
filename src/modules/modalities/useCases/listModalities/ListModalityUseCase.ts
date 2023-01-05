import { inject, injectable } from "tsyringe";

import { Modalities } from "../../entities/Modalities";
import { IModalitiesRepository } from "../../repositories/IModalitiesRepository";

@injectable()
class ListModalityUseCase {
  constructor(
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute(): Promise<Modalities[]> {
    const modalities = await this.modalitiesRepository.list();

    return modalities;
  }
}

export { ListModalityUseCase };
