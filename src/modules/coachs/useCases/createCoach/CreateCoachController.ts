import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCoachUseCase } from "./CreateCoachUseCase";

class CreateCoachController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, registration, status } = request.body;

    const createCoachUseCase = container.resolve(CreateCoachUseCase);

    await createCoachUseCase.execute({ name, registration, status });

    return response.status(201).send();
  }
}

export { CreateCoachController };
