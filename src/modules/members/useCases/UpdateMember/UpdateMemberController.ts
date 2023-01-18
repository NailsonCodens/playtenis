import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateMemberUseCase } from "./UpdateMemberUseCase";

class UpdateMemberController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, registration, status } = request.body;
    const { id } = request.params;

    const updateMemberUseCase = await container.resolve(UpdateMemberUseCase);

    const updatedMember = await updateMemberUseCase.execute({
      id,
      name,
      registration,
      status,
    });

    return response.status(201).json(updatedMember);
  }
}

export { UpdateMemberController };
