import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListMembersUseCase } from "./ListMembersUseCase";

class ListMembersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listMembersUseCase = container.resolve(ListMembersUseCase);

    const members = await listMembersUseCase.execute();

    return response.status(201).json({ members });
  }
}

export { ListMembersController };
