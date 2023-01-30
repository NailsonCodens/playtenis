import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListGamesByCourtUseCase } from "./ListGamesByCourtUseCase";

class ListGamesBYCourtController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { court_id } = request.body;

    const listGamesByCourtUseCase = container.resolve(ListGamesByCourtUseCase);

    const game = await listGamesByCourtUseCase.execute(court_id);

    return response.status(201).json(game);
  }
}

export { ListGamesBYCourtController };
