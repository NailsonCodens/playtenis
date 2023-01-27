import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCoachUseCase } from "./DeleteCoachUseCase";

class DeleteCoachController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCoachController = container.resolve(DeleteCoachUseCase);

    await deleteCoachController.execute(id);

    return response
      .status(201)
      .json({ message: "Professor deletada com sucesso" });
  }
}

export { DeleteCoachController };
