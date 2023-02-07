import { Response, Request } from "express";
import { container } from "tsyringe";

import { AddGameInQueueUseCase } from "./AddGameInQueueUseCase";

class AddGameInQueueController {
  async handle(request: Request, response: Response) {
    const { modality_id, players } = request.body;

    const addGameInQueueUseCase = container.resolve(AddGameInQueueUseCase);

    await addGameInQueueUseCase.execute({ modality_id, players });

    return response.json({
      message:
        "Jogadores adicionados a fila de espera para entrar na próxima quadra livre",
    });
  }
}

export { AddGameInQueueController };
