import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateCourtUseCase } from "./UpdateCourtUseCase";

class UpdateCourtController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, status } = request.body;
    const { id } = request.params;

    const updateCourtUseCase = container.resolve(UpdateCourtUseCase);

    const updateCourt = await updateCourtUseCase.execute({ id, name, status });

    return response.status(200).json(updateCourt);
  }
}

export { UpdateCourtController };
