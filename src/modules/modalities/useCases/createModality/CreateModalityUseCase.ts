import { inject, injectable } from "tsyringe";

import { ICreateModalityDTO } from "@modules/modalities/dtos/ICreateModalityDTO";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";

@injectable()
class CreateModalityUseCase {
  constructor(
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute({
    name,
    amount_players,
    time,
    status,
  }: ICreateModalityDTO): Promise<void> {
    const modality = await this.modalitiesRepository.findByName(name);

    if (modality) {
      throw new Error("Esta modalidade já existe");
    }

    await this.modalitiesRepository.create({
      name,
      amount_players,
      time,
      status,
    });
  }
}

export { CreateModalityUseCase };
