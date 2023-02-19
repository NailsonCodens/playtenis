import { Response, Request } from "express";
import { container } from "tsyringe";

import { AddPlayersInQueueUSeCase } from "./AddPlayersInQueueUseCase";

class AddPlayersInQueueController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { queue_id, players } = request.body;

    const addPlayersInQueueUseCase = container.resolve(
      AddPlayersInQueueUSeCase
    );

    await addPlayersInQueueUseCase.execute(queue_id, players);

    return response.send();
  }
}

export { AddPlayersInQueueController };
