import { Response, Request } from "express";
import { container } from "tsyringe";

import { AddGameInQueueUseCase } from "./AddGameInQueueUseCase";

class AddGameInQueueController {
  async handle(request: Request, response: Response) {
    const addGameInQueueUseCase = container.resolve(AddGameInQueueUseCase);

    addGameInQueueUseCase.execute();
  }
}

export { AddGameInQueueController };
