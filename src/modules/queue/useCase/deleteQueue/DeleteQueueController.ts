import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteQueueUseCase } from "./DeleteQueueUseCase";

class DeleteQueueController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteQueueUseCase = container.resolve(DeleteQueueUseCase);

    await deleteQueueUseCase.execute(id);

    return response
      .status(201)
      .json({ message: "Fila de espera deletada com sucesso" });
  }
}

export { DeleteQueueController };
