import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";

@injectable()
class ListAllCourtsWithGamesUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository
  ) {}

  async execute() {
    const date_now = dayjs();
    const date_start_game = dayjs(date_now).toDate();

    const list = await this.courtsRepository.listWithGames(date_start_game);

    const count = list.length;

    const courtsOk = await this.courtsRepository.listCourtsWithStatusOk();

    const amountCourtsOk = courtsOk.length;

    console.log(amountCourtsOk);

    const amounts = {
      courtsOk: amountCourtsOk,
      countWithGame: count,
    };

    return amounts;
  }
}

export { ListAllCourtsWithGamesUseCase };
