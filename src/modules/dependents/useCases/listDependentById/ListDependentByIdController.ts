import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListDendpendentByIdUseCase } from "./ListDependentByIdUseCase";

class ListDependentByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listDependentByIdUseCase = container.resolve(
      ListDendpendentByIdUseCase
    );

    const dependent = await listDependentByIdUseCase.execute(id);

    return response.json(dependent);
  }
}

export { ListDependentByIdController };
