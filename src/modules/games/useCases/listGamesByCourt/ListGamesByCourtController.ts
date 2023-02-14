import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListGamesByCourtUseCase } from "./ListGamesByCourtUseCase";

class ListGamesBYCourtController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listGamesByCourtUseCase = container.resolve(ListGamesByCourtUseCase);

    const game = await listGamesByCourtUseCase.execute(id);

    return response.status(201).json(game);
  }
}

export { ListGamesBYCourtController };
