import { inject, injectable } from "tsyringe";

import { ICreateModalityDTO } from "../../dtos/ICreateModalityDTO";
import { ModalitiesRespository } from "../../repositories/implementations/ModalitiesRespository";

@injectable()
class CreateModalityUseCase {
  constructor(
    @inject("ModalitiesRespository")
    private modalitiesRepository: ModalitiesRespository
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
