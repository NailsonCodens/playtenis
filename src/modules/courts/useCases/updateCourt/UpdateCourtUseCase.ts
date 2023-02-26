import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Courts } from "@modules/courts/entities/Courts";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { socketio } from "@shared/socket.io";

@injectable()
class UpdateCourtUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository,
    @inject("GamesRepository") private gamesRepository: IGamesRepository
  ) {}

  async execute({ id, name, status }): Promise<Courts> {
    const courtAlredyExistsWithId = await this.courtsRepository.findById(id);
    const date_now = dayjs();
    const date_start_game = dayjs(date_now).toDate();

    if (!courtAlredyExistsWithId) {
      throw new AppError("Esta quadra não existe");
    }

    const courtAlredyExistsWithName = await this.courtsRepository.findByName(
      name
    );

    if (courtAlredyExistsWithName !== null) {
      if (courtAlredyExistsWithName.id !== id) {
        throw new AppError("Já existe uma outra quadra com este nome");
      }
    }

    const gameCourtCurrent = await this.gamesRepository.findCurrentGameByCourt({
      court_id: courtAlredyExistsWithName.id,
      date_start_game,
    });

    console.log(gameCourtCurrent);

    if (gameCourtCurrent) {
      console.log("temgame");
      await this.gamesRepository.update(gameCourtCurrent.id);
    }

    const court = await this.courtsRepository.update({ id, name, status });
    socketio.emit("reloadApp", "Atualiza a quadra");

    return court;
  }
}

export { UpdateCourtUseCase };
