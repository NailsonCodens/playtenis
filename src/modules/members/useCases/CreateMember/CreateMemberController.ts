import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateMemberUseCase } from "./CreateMemberUSeCase";

class CreateMemberController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, registration, status } = request.body;

    const createMemberUseCase = container.resolve(CreateMemberUseCase);

    await createMemberUseCase.execute({ name, registration, status });

    return response
      .status(201)
      .json({ message: "Associado Salvo com sucesso" });
  }
}

export { CreateMemberController };
