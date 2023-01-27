import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateDependentUseCase } from "./UpdateDependentUseCase";

class UpdateDepedentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, member_id, registration, status } = request.body;
    const { id } = request.params;

    const updateDepedentUseCase = container.resolve(UpdateDependentUseCase);

    const depedentUpdated = await updateDepedentUseCase.execute({
      id,
      name,
      registration,
      status,
      member_id,
    });

    return response.json(depedentUpdated);
  }
}

export { UpdateDepedentController };
