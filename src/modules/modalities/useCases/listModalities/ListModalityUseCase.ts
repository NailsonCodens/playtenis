import { Modalities } from "@modules/modalities/entities/Modalities";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";
import { inject, injectable } from "tsyringe";

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
