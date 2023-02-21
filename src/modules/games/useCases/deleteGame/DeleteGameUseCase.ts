import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";

@injectable()
class DeleteGameUseCase {
  constructor(
    @inject("GamesRepository") private gamesRepository: IGamesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const game = await this.gamesRepository.findById(id);

    if (game) {
      if (game.players.length === 0) {
        await this.gamesRepository.delete(id);
      }
    }

    if (!game) {
      throw new AppError("Este jogo não existe");
    }
  }
}

export { DeleteGameUseCase };
