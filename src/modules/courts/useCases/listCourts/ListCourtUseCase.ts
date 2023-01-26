import { inject, injectable } from "tsyringe";

import { Courts } from "@modules/courts/entities/Courts";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";

@injectable()
class ListCourtUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository
  ) {}

  async execute(): Promise<Courts[]> {
    const courts = await this.courtsRepository.list();

    return courts;
  }
}

export { ListCourtUseCase };
