import { inject, injectable } from "tsyringe";

import { Courts } from "../../entities/Courts";
import { CourtsRepository } from "../../repositories/implementation/CourtsRespository";

@injectable()
class ListCourtUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: CourtsRepository
  ) {}

  async execute(): Promise<Courts[]> {
    const courts = await this.courtsRepository.list();

    return courts;
  }
}

export { ListCourtUseCase };
