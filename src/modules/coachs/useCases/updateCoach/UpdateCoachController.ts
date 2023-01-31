import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCoachUseCase } from "./UpdateCoachUseCase";

class UpdateCoachController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, registration, status } = request.body;

    const updateCoachUseCase = container.resolve(UpdateCoachUseCase);

    const coachUpdated = await updateCoachUseCase.execute({
      id,
      name,
      registration,
      status,
    });

    return response.status(201).json(coachUpdated);
  }
}

export { UpdateCoachController };
