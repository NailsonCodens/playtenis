import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { ICreateGameDTO } from "@modules/games/dtos/ICreateGameDTO";
import { Games } from "@modules/games/entities/Games";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";

dayjs.extend(utc);

@injectable()
class CreateGamesUseCase {
  constructor(
    @inject("GamesRepository") private gamesRepository: IGamesRepository,
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository,
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute({ court_id, modality_id }: ICreateGameDTO): Promise<Games> {
    const courtExists = await this.courtsRepository.findById(court_id);

    if (!courtExists) {
      throw new AppError("A quadra não existe");
    }

    if (courtExists.status !== "ok") {
      throw new AppError("A quadra não está disponível para jogos");
    }

    const modalityExists = await this.modalitiesRepository.findById(
      modality_id
    );

    if (!modalityExists) {
      throw new AppError("A modalidade não existe");
    }

    if (modalityExists.status !== "ok") {
      throw new AppError("A modalidade não está disponível para jogos");
    }

    const gameTime = modalityExists.time;

    const date_now = dayjs();

    const start_time_game = dayjs(date_now).toDate();

    const end_time_date = dayjs(start_time_game)
      .add(gameTime, "minute")
      .toDate();

    const gameTodayBetweenHoursAlredyExists =
      await this.gamesRepository.findGameTodayBetweenHours({
        court_id,
        date_start_game: start_time_game,
      });

    if (gameTodayBetweenHoursAlredyExists) {
      throw new AppError(
        `Já existe um jogo em andamento neste momento para esta quadra`
      );
    }

    // verificar se o cadastro de jogadores é o que a modalidade permite
    // verificar quando o jogo da quadra terminar

    const game = await this.gamesRepository.create({
      court_id,
      modality_id,
      modality_time: gameTime,
      start_time_game,
      end_time_game: end_time_date,
    });

    return game;
  }
}

export { CreateGamesUseCase };
