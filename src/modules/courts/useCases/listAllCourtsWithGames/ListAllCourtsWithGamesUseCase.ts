import { inject, injectable } from "tsyringe";

import { CourtsRepository } from "@modules/courts/repositories/implementation/CourtsRespository";

@injectable()
class ListAllCourtsWithGamesUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: CourtsRepository
  ) {}

  async execute() {
    const list = await this.courtsRepository.listWithGames();

    return list;
  }
}

export { ListAllCourtsWithGamesUseCase };
