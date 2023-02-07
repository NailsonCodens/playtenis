import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateQueueIsPlayedUseCase } from "./UpdateQueueIsPlayedUseCase";

class UpdateQueueIsPlayedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateQueueIsPlayedUseCase = container.resolve(
      UpdateQueueIsPlayedUseCase
    );

    const updatedQueueIsPlays = await updateQueueIsPlayedUseCase.execute(id);

    return response.json(updatedQueueIsPlays);
  }
}

export { UpdateQueueIsPlayedController };
