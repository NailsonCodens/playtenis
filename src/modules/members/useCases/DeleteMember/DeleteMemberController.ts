import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteMemberUseCase } from "./DeleteMemberUseCase";

class DeleteMemberController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMemberUseCase = container.resolve(DeleteMemberUseCase);

    await deleteMemberUseCase.execute(id);

    return response
      .status(201)
      .json({ message: "Associado deletado com sucesso" });
  }
}

export { DeleteMemberController };
