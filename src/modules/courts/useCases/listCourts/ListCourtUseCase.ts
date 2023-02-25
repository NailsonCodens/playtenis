import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { Courts } from "@modules/courts/entities/Courts";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { GameMap } from "@shared/mapper/GameMapper";

@injectable()
class ListCourtUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository,
    @inject("GamesRepository") private gamesRepository: IGamesRepository
  ) {}

  async execute(): Promise<Courts[]> {
    const courts = await this.courtsRepository.list();
    const date_now = dayjs();
    const date_start_game = dayjs(date_now).toDate();

    const courtsFormatted = await Promise.all(
      courts.map(async (court) => {
        const gameCourtCurrent =
          await this.gamesRepository.findCurrentGameByCourt({
            court_id: court.id,
            date_start_game,
          });

        let haveGame;

        if (!gameCourtCurrent) {
          haveGame = {
            id: null,
            date_game: null,
            court_id: null,
            modality_id: null,
            modality_type: null,
            start_time_game: null,
            end_time_game: null,
            time: 0,
            players: [],
          };
        } else {
          haveGame = GameMap.toDTO(gameCourtCurrent);
        }

        return {
          ...court,
          game: haveGame,
        };
      })
    );

    return courtsFormatted;
  }
}

export { ListCourtUseCase };
