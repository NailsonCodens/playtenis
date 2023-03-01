import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { ICreateGameWithPlayerDTO } from "@modules/games/dtos/ICreateGameWithPlayerDTO";
import { Games } from "@modules/games/entities/Games";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";
import { socketio } from "@shared/socket.io";

dayjs.extend(utc);

@injectable()
class CreateGamesUseCase {
  constructor(
    @inject("GamesRepository") private gamesRepository: IGamesRepository,
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository,
    @inject("MembersRepository") private membersRepository: IMembersRepository,
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute({
    court_id,
    modality_id,
    players,
  }: ICreateGameWithPlayerDTO): Promise<Games> {
    const courtExists = await this.courtsRepository.findById(court_id);

    if (!courtExists) {
      throw new AppError("A quadra não existe");
    }

    console.log("teste");

    if (courtExists.status !== "ok") {
      throw new AppError(
        `A quadra não está disponível para jogos ${courtExists.status}`
      );
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

    const preparationAditionalTime = Number(10);

    const gameTime = Number(modalityExists.time) + preparationAditionalTime;

    const date_now = dayjs();
    const start_time_game = dayjs(date_now).toDate();

    const end_time_date = dayjs(start_time_game)
      .add(gameTime, "minute")
      .toDate();

    const start_time_gameTypeDate = dayjs(start_time_game).toDate();

    const gameTodayBetweenHoursAlredyExists =
      await this.gamesRepository.findGameTodayBetweenHours({
        court_id,
        date_start_game: start_time_gameTypeDate,
      });

    if (gameTodayBetweenHoursAlredyExists) {
      throw new AppError(
        `Já existe um jogo em andamento neste momento para esta quadra`
      );
    }

    const findGame = await this.gamesRepository.findGameWithPlayers(
      players,
      start_time_game
    );

    if (findGame) {
      throw new AppError(
        "Todos ou alguns destes jogadores estão jogando ainda."
      );
    }

    const modalityGame = await this.modalitiesRepository.findById(modality_id);

    const amountPlayers = players.length;

    const amoutPlayersAllowed =
      modalityGame.amount_players as unknown as number;

    if (amountPlayers > amoutPlayersAllowed) {
      throw new AppError(
        `Esta modalidade permite apenas ${amoutPlayersAllowed} jogadores(as)`
      );
    }

    if (amountPlayers < amoutPlayersAllowed) {
      throw new AppError(
        `Esta modalidade permite ${amoutPlayersAllowed} jogadores, por favor adicione outro(s) jogadores(as)`
      );
    }

    const playersGame = await this.membersRepository.findByIds(players);

    const game = await this.gamesRepository.create({
      court_id,
      modality_id,
      modality_time: gameTime,
      players: playersGame,
      start_time_game,
      end_time_game: end_time_date,
    });
    socketio.emit("reloadApp", "Cadastro de um jogo");

    return game;
  }
}

export { CreateGamesUseCase };
