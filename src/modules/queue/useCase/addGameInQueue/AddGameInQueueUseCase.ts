import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";
import { IRequestQueueDTO } from "@modules/queue/dtos/IRequestQueueDTO";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";

@injectable()
class AddGameInQueueUseCase {
  constructor(
    @inject("QueueRepository") private queueRepository: IQueueRepository,
    @inject("GamesRepository") private gamesRepository: IGamesRepository,
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository,
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute({ modality_id }: IRequestQueueDTO): Promise<void> {
    const modalityExists = await this.modalitiesRepository.findById(
      modality_id
    );

    if (!modalityExists) {
      throw new AppError("A modalidade não existe");
    }

    if (modalityExists.status !== "ok") {
      throw new AppError("A modalidade não está disponível para jogos");
    }

    await this.queueRepository.create({
      modality_id,
      played: "no",
    });
  }
}

export { AddGameInQueueUseCase };
