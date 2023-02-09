import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListModalityByIdUseCase } from "./ListModalityByIdUseCase";

class ListModalityByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listModalityByIdUseCase = container.resolve(ListModalityByIdUseCase);

    const modality = await listModalityByIdUseCase.execute(id);

    return response.json(modality);
  }
}

export { ListModalityByIdController };
