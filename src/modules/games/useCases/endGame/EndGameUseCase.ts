import { inject, injectable } from "tsyringe";

import { Games } from "@modules/games/entities/Games";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { socketio } from "@shared/socket.io";

@injectable()
class EndGameUseCase {
  constructor(
    @inject("GamesRepository") private gamesRepository: IGamesRepository
  ) {}

  async execute(id: string): Promise<Games> {
    const gameShow = await this.gamesRepository.findById(id);

    await this.gamesRepository.update(id);

    socketio.emit("reloadApp", "Atualiza a quadra");

    return gameShow;
  }
}

export { EndGameUseCase };
