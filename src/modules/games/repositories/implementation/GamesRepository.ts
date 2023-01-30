import { In, LessThan, MoreThan, Repository } from "typeorm";

import { AppDataSource } from "@database/data-source";
import { ICreateGameDTO } from "@modules/games/dtos/ICreateGameDTO";
import { IFindGameDTO } from "@modules/games/dtos/IFindGameDTO";
import { Games } from "@modules/games/entities/Games";

import { IGamesRepository } from "../IGamesRepository";

class GamesRepository implements IGamesRepository {
  private repository: Repository<Games>;

  constructor() {
    this.repository = AppDataSource.getRepository(Games);
  }

  async create({
    court_id,
    modality_id,
    modality_time,
    start_time_game,
    end_time_game,
    id,
    players,
  }: ICreateGameDTO): Promise<Games> {
    const game = this.repository.create({
      court_id,
      modality_id,
      modality_time,
      start_time_game,
      end_time_game,
      players,
      id,
    });

    await this.repository.save(game);

    return game;
  }

  async findById(id: string): Promise<Games> {
    const game = await this.repository.findOneBy({ id });

    return game;
  }

  async findGameTodayBetweenHours({
    court_id,
    date_start_game,
  }: IFindGameDTO): Promise<Games> {
    const game = await this.repository.findOne({
      where: {
        court_id,
        start_time_game: LessThan(date_start_game),
        end_time_game: MoreThan(date_start_game),
      },
    });

    return game;
  }

  async findCurrentGameByCourt({ court_id, date_start_game }: IFindGameDTO) {
    const game = await this.repository.findOne({
      relations: {
        players: true,
        courts: true,
        modality: true,
      },
      where: {
        court_id,
        start_time_game: LessThan(date_start_game),
        end_time_game: MoreThan(date_start_game),
      },
    });

    return game;
  }

  async findGameWithPlayers(
    player_ids: string[],
    date_start_game: Date
  ): Promise<Games> {
    const game = await this.repository.findOne({
      relations: {
        players: true,
      },
      where: {
        players: {
          id: In(player_ids),
        },
        start_time_game: LessThan(date_start_game),
        end_time_game: MoreThan(date_start_game),
      },
    });

    return game;
  }
}

export { GamesRepository };
