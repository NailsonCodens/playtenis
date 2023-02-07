import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListDependentsUseCase } from "@modules/dependents/useCases/ListDependent/ListDependentsUseCase";

class ListDependentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { member_id } = request.params;

    const listDependentUseCase = container.resolve(ListDependentsUseCase);

    const dependents = await listDependentUseCase.execute(member_id);

    return response.status(201).json({ dependents });
  }
}

export { ListDependentsController };
