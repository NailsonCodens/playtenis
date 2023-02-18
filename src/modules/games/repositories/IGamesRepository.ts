import { IFindGameDTO } from "@modules/games/dtos/IFindGameDTO";

import { ICreateGameDTO } from "../dtos/ICreateGameDTO";
import { Games } from "../entities/Games";

interface IGamesRepository {
  create(data: ICreateGameDTO): Promise<Games>;
  findById(id: string): Promise<Games>;
  findGameTodayBetweenHours(data: IFindGameDTO): Promise<Games>;
  findCurrentGameByCourt({
    court_id,
    date_start_game,
  }: IFindGameDTO): Promise<Games>;
  findGameWithPlayers(
    player_ids: string[],
    date_start_game: Date
  ): Promise<Games>;
}

export { IGamesRepository };
