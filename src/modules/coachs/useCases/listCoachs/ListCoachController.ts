import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCoachUseCase } from "./ListCoachUseCase";

class ListCoachController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCoachUseCase = container.resolve(ListCoachUseCase);

    const coachs = await listCoachUseCase.execute();

    return response.status(200).json(coachs);
  }
}

export { ListCoachController };
