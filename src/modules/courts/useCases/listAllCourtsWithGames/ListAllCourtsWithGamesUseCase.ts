import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { CourtsRepository } from "@modules/courts/repositories/implementation/CourtsRespository";

@injectable()
class ListAllCourtsWithGamesUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: CourtsRepository
  ) {}

  async execute() {
    const date_now = dayjs();
    const date_start_game = dayjs(date_now).toDate();

    const list = await this.courtsRepository.listWithGames(date_start_game);

    const count = list.length;

    return count;
  }
}

export { ListAllCourtsWithGamesUseCase };
