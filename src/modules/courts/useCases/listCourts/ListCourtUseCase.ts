import { inject, injectable } from "tsyringe";

import { Courts } from "../../entities/Courts";
import { ICourtsRepository } from "../../repositories/ICourtsRepository";

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
