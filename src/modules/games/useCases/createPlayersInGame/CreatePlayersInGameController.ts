import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreatePlayersInGameUseCase } from "./CreatePlayersInGameUseCase";

class CreatePlayersInGameController {
  async handle(request: Request, response: Response) {
    const { players, game_id } = request.body;

    const createPlayersINGameUseCase = container.resolve(
      CreatePlayersInGameUseCase
    );

    await createPlayersINGameUseCase.execute(players, game_id);
  }
}

export { CreatePlayersInGameController };
