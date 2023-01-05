import { inject, injectable } from "tsyringe";

import { ICreateModalityDTO } from "../../dtos/ICreateModalityDTO";
import { Modalities } from "../../entities/Modalities";
import { IModalitiesRepository } from "../../repositories/IModalitiesRepository";

@injectable()
class UpdateModalityUseCase {
  constructor(
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute({
    id,
    name,
    amount_players,
    time,
    status,
  }: ICreateModalityDTO): Promise<Modalities> {
    const modalityAlredyExists = await this.modalitiesRepository.findById(id);

    if (!modalityAlredyExists) {
      throw new Error("Esta modalidade não existe");
    }

    const updateModalityUseCase = await this.modalitiesRepository.update({
      id,
      name,
      amount_players,
      time,
      status,
    });

    return updateModalityUseCase;
  }
}
export { UpdateModalityUseCase };
