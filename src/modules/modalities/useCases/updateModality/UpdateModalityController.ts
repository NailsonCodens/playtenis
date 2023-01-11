import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateModalityUseCase } from "./UpdateModalityUseCase";

class UpdateModalityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, amount_players, time, status } = request.body;
    const { id } = request.params;

    const updateModalityUseCase = container.resolve(UpdateModalityUseCase);

    const updatedModality = await updateModalityUseCase.execute({
      id,
      name,
      amount_players,
      time,
      status,
    });

    return response.status(200).json(updatedModality);
  }
}

export { UpdateModalityController };
