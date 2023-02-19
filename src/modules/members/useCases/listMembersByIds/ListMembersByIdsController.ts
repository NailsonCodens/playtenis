import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListMembersByIdsUseCase } from "./ListMembersByIdsUseCase";

class ListMembersByIdsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { ids } = request.body;

    const listMembersByIdsUseCase = container.resolve(ListMembersByIdsUseCase);

    const list = await listMembersByIdsUseCase.execute(ids);

    return response.json(list);
  }
}

export { ListMembersByIdsController };
