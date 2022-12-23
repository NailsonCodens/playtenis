import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCourtUseCase } from "./ListCourtUseCase";

class ListCourtController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listcourtsUseCase = container.resolve(ListCourtUseCase);

      const list = await listcourtsUseCase.execute();

      return response.status(200).json({ list });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { ListCourtController };
