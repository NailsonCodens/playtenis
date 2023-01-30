import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { Games } from "@modules/games/entities/Games";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";

@injectable()
class ListGamesByCourtUseCase {
  constructor(
    @inject("GamesRepository") private gamesRepository: IGamesRepository
  ) {}

  async execute(court_id: string): Promise<Games> {
    const date_start_game = dayjs().toDate();
    const gameCourtCurrent = await this.gamesRepository.findCurrentGameByCourt({
      court_id,
      date_start_game,
    });

    gameCourtCurrent.teste = "asd";

    return gameCourtCurrent;
  }
}

export { ListGamesByCourtUseCase };
