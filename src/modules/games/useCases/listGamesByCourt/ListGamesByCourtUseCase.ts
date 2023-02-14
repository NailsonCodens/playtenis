import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { Games } from "@modules/games/entities/Games";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";

@injectable()
class ListGamesByCourtUseCase {
  constructor(
    @inject("GamesRepository") private gamesRepository: IGamesRepository
  ) {}

  async execute(id: string): Promise<Games> {
    const date_now = dayjs();
    const date_start_game = dayjs(date_now).toDate();

    const gameCourtCurrent = await this.gamesRepository.findCurrentGameByCourt({
      court_id: id,
      date_start_game,
    });

    return gameCourtCurrent;
  }
}

export { ListGamesByCourtUseCase };
