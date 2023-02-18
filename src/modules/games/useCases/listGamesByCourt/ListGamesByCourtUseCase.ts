import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Courts } from "@modules/courts/entities/Courts";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { IGameMapDTO } from "@modules/games/dtos/IGameMapDTO";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { GameMap } from "@shared/mapper/GameMapper";

interface IReturnObject {
  court: Courts;
  game: IGameMapDTO;
}

@injectable()
class ListGamesByCourtUseCase {
  constructor(
    @inject("GamesRepository") private gamesRepository: IGamesRepository,
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository
  ) {}

  async execute(id: string): Promise<IReturnObject> {
    const date_now = dayjs();
    const date_start_game = dayjs(date_now).toDate();

    const court = await this.courtsRepository.findById(id);

    if (!court) {
      throw new AppError("Esta quadra não existe");
    }

    const gameCourtCurrent = await this.gamesRepository.findCurrentGameByCourt({
      court_id: id,
      date_start_game,
    });

    let typeReturnGameCourtCurrent: IReturnObject;

    if (!gameCourtCurrent) {
      typeReturnGameCourtCurrent = {
        game: null,
        court,
      };
    } else {
      typeReturnGameCourtCurrent = {
        game: GameMap.toDTO(gameCourtCurrent),
        court,
      };
    }

    return typeReturnGameCourtCurrent;
  }
}

export { ListGamesByCourtUseCase };
