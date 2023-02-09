import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCourtByIdUseCase } from "./ListCourtByIdUseCase";

class ListCourtByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCourtByIdUseCase = container.resolve(ListCourtByIdUseCase);

    const court = await listCourtByIdUseCase.execute(id);

    return response.json(court);
  }
}

export { ListCourtByIdController };
