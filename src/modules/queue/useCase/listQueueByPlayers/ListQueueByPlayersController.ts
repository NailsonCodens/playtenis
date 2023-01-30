import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListQueueByPlayersUseCase } from "./ListQueueByPlayersUseCase";

class ListQueueByPlayersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { players } = request.body;

    const listQueueByPlayersUseCase = container.resolve(
      ListQueueByPlayersUseCase
    );

    const listByPlayers = await listQueueByPlayersUseCase.execute(players);

    return response.json(listByPlayers);
  }
}

export { ListQueueByPlayersController };
