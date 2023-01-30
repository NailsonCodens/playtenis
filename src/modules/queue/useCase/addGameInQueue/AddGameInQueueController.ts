import { Response, Request } from "express";
import { container } from "tsyringe";

import { AddGameInQueueUseCase } from "./AddGameInQueueUseCase";

class AddGameInQueueController {
  async handle(request: Request, response: Response) {
    const { court_id, modality_id, players } = request.body;

    const addGameInQueueUseCase = container.resolve(AddGameInQueueUseCase);

    await addGameInQueueUseCase.execute({ court_id, modality_id, players });

    return response.json({
      message:
        "Jogadores adicionados a fila de espera para entrar na próxima quadra livre",
    });
  }
}

export { AddGameInQueueController };
