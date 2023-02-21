import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListMemberByRegistrationUseCase } from "./ListMemberByRegistrationUseCase";

class ListMemberRegistrationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { registration } = request.params;

    const listMemberByRegistrationUseCase = container.resolve(
      ListMemberByRegistrationUseCase
    );

    const member = await listMemberByRegistrationUseCase.execute(registration);

    return response.json(member);
  }
}

export { ListMemberRegistrationController };
