import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListQueueUseCase } from "./ListQueueUseCase";

class ListQueueController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listQueueUseCase = container.resolve(ListQueueUseCase);

    const list = await listQueueUseCase.execute();

    return response.json(list);
  }
}

export { ListQueueController };
