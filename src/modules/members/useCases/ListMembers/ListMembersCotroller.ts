import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListMembersUseCase } from "./ListMembersUseCase";

class ListMembersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { perpage, page, order } = request.query;
    const { search } = request.query;

    const listMembersUseCase = container.resolve(ListMembersUseCase);

    const members = await listMembersUseCase.execute(
      Number(perpage),
      Number(page),
      String(order),
      String(search)
    );

    return response.status(201).json({ members });
  }
}

export { ListMembersController };
