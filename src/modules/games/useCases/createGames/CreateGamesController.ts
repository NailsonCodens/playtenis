import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateGamesUseCase } from "./CreateGamesUseCase";

class CreateGamesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      court_id,
      modality_id,
      modality_time,
      players,
      start_time_game,
      end_time_game,
    } = request.body;

    const createGamesUseCase = container.resolve(CreateGamesUseCase);

    const game = await createGamesUseCase.execute({
      court_id,
      modality_id,
      modality_time,
      players,
      start_time_game,
      end_time_game,
    });

    return response.status(201).json(game);
  }
}

export { CreateGamesController };
