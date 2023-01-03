import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateModalityUseCase } from "./CreateModalityUseCase";

class CreateModalityControler {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, amount_players, time, status } = request.body;

    const createModalityUseCase = container.resolve(CreateModalityUseCase);

    createModalityUseCase.execute({ name, amount_players, time, status });

    return response.status(201).send();
  }
}

export { CreateModalityControler };
