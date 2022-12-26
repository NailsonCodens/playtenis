import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, surname, login, password } = request.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);
      await createUserUseCase.execute({ name, surname, login, password });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateUserController };
