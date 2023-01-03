import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteModalityUseCase } from "./DeleteModalityUseCase";

class DeleteModalityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteModalityUseCase = container.resolve(DeleteModalityUseCase);

    await deleteModalityUseCase.execute({ id });

    return response
      .status(201)
      .json({ message: "Modalidade deletada com sucesso" });
  }
}

export { DeleteModalityController };
