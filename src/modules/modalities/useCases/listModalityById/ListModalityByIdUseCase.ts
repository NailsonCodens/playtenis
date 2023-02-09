import { inject, injectable } from "tsyringe";

import { Modalities } from "@modules/modalities/entities/Modalities";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";

import { AppError } from "../../../../errors/AppError";

@injectable()
class ListModalityByIdUseCase {
  constructor(
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute(id: string): Promise<Modalities> {
    console.log(id);
    const modality = await this.modalitiesRepository.findById(id);

    if (!modality) {
      throw new AppError("Esta modalidade não existe.");
    }

    return modality;
  }
}

export { ListModalityByIdUseCase };
