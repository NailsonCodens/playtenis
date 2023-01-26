import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteDependentUseCase } from "./DeleteDependentUseCase";

class DeleteDependentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteDependentUseCase = await container.resolve(
      DeleteDependentUseCase
    );

    await deleteDependentUseCase.execute(id);

    return response
      .status(201)
      .json({ message: "Dependente deletado com sucesso" });
  }
}

export { DeleteDependentController };
