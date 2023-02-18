import { instanceToInstance } from "class-transformer";

import { IGameMapDTO } from "@modules/games/dtos/IGameMapDTO";
import { Games } from "@modules/games/entities/Games";

class GameMap {
  static toDTO({
    court_id,
    modality_id,
    modality_time,
    start_time_game,
    end_time_game,
    id,
    created_at,
    updated_at,
    deleted_at,
    time,
    players,
    modality,
    courts,
  }: Games): IGameMapDTO {
    const game = instanceToInstance({
      court_id,
      modality_id,
      modality_time,
      start_time_game,
      end_time_game,
      id,
      created_at,
      updated_at,
      deleted_at,
      time,
      players,
      modality,
      courts,
    });

    return game;
  }
}

export { GameMap };
