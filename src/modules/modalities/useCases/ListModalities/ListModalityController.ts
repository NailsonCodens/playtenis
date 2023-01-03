import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListModalityUseCase } from "./ListModalityUseCase";

class ListModalityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listModalitiesUseCase = container.resolve(ListModalityUseCase);

    const listModalities = await listModalitiesUseCase.execute();

    return response.status(200).json(listModalities);
  }
}

export { ListModalityController };
