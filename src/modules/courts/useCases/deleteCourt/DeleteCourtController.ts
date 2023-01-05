import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteCourtUseCase } from "./DeleteCourtUseCase";

class DeleteCourtControler {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCoutUseCase = container.resolve(DeleteCourtUseCase);

    deleteCoutUseCase.execute({ id });

    return response
      .status(201)
      .json({ message: "Modalidade deletada com sucesso" });
  }
}

export { DeleteCourtControler };
