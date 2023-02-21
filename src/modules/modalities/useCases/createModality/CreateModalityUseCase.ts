import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICreateModalityDTO } from "@modules/modalities/dtos/ICreateModalityDTO";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";

@injectable()
export class CreateModalityUseCase {
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

    const amount_players_number = Number(amount_players);

    if (amount_players_number > 4) {
      throw new AppError(
        "Não é permitido cadastrar uma modalidade com mais de 4 jogadores"
      );
    }

    if (modality) {
      throw new AppError("Esta modalidade já existe");
    }

    await this.modalitiesRepository.create({
      name,
      amount_players,
      time,
      status,
    });
  }
}
