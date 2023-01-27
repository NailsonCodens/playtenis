import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateDependentUseCase } from "./CreateDependentUseCase";

class CreateDependentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { registration, status, name } = request.body;
    const { member_id } = request.params;

    const createDependentUseCase = container.resolve(CreateDependentUseCase);

    await createDependentUseCase.execute({
      member_id,
      name,
      registration,
      status,
    });

    return response.send();
  }
}

export { CreateDependentController };
