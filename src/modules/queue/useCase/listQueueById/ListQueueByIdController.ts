import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListQueueByIdUseCase } from "./ListQueueByIdUseCase";

class ListQueueByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listQueueByUseCase = container.resolve(ListQueueByIdUseCase);

    const queue = await listQueueByUseCase.execute(id);

    return response.json(queue);
  }
}

export { ListQueueByIdController };
