import { Response, Request } from "express";
import { container } from "tsyringe";

import { EndGameUseCase } from "./EndGameUseCase";

class EndGameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const endGameUseCase = container.resolve(EndGameUseCase);

    const game = await endGameUseCase.execute(id);

    return response.status(200).json(game);
  }
}

export { EndGameController };
