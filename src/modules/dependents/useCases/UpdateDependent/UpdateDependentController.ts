import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateDependentUseCase } from "./UpdateDependentUseCase";

class UpdateDepedentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, member_id } = request.body;
    const { id } = request.params;

    const updateDepedentUseCase = container.resolve(UpdateDependentUseCase);

    const depedentUpdated = await updateDepedentUseCase.execute({
      id,
      name,
      member_id,
    });

    return response.json(depedentUpdated);
  }
}

export { UpdateDepedentController };
