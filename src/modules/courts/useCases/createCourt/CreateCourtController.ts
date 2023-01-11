import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCourtUseCase } from "./CreateCourtUseCase";

class CreateCourtController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, status } = request.body;

    const createCourtUseCase = container.resolve(CreateCourtUseCase);

    await createCourtUseCase.execute({ name, status });

    return response.status(201).json({ message: "Quadra Salva com sucesso" });
  }
}

export { CreateCourtController };
