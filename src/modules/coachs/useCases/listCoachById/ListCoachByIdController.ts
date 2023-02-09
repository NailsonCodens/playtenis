import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCoachByIdUseCase } from "./ListCoachByIdUseCase";

class ListCoachByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCoachByIdUseCase = container.resolve(ListCoachByIdUseCase);

    const coach = await listCoachByIdUseCase.execute(id);

    return response.json(coach);
  }
}

export { ListCoachByIdController };
