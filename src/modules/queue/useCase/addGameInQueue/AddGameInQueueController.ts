import { Response, Request } from "express";
import { container } from "tsyringe";

import { AddGameInQueueUseCase } from "./AddGameInQueueUseCase";

class AddGameInQueueController {
  async handle(request: Request, response: Response) {
    const { modality_id } = request.body;

    const addGameInQueueUseCase = container.resolve(AddGameInQueueUseCase);

    await addGameInQueueUseCase.execute({ modality_id });

    return response.json({
      message: "Fila de espera criada",
    });
  }
}

export { AddGameInQueueController };
