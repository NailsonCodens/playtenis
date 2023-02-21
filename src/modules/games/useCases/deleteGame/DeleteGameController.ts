import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteGameUseCase } from "./DeleteGameUseCase";

class DeleteGameController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteGameUseCase = container.resolve(DeleteGameUseCase);

    await deleteGameUseCase.execute(id);

    return response.send();
  }
}

export { DeleteGameController };
