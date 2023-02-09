import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListMemberByIdUseCase } from "./ListMemberByIdUseCase";

class ListMemberByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listMemberByidUseCase = container.resolve(ListMemberByIdUseCase);

    const member = await listMemberByidUseCase.execute(id);

    return response.json(member);
  }
}

export { ListMemberByIdController };
