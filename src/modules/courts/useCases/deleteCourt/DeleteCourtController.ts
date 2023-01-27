import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteCourtUseCase } from "./DeleteCourtUseCase";

class DeleteCourtControler {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCoutUseCase = container.resolve(DeleteCourtUseCase);

    await deleteCoutUseCase.execute({ id });

    return response
      .status(201)
      .json({ message: "Quadra deletada com sucesso" });
  }
}

export { DeleteCourtControler };
