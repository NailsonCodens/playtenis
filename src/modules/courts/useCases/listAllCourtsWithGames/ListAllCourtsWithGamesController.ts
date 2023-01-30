import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListAllCourtsWithGamesUseCase } from "./ListAllCourtsWithGamesUseCase";

class ListAllCourtsWithGamesController {
  async handle(request: Request, response: Response) {
    const listAllCourtsWithGamesUsecase = container.resolve(
      ListAllCourtsWithGamesUseCase
    );

    const list = await listAllCourtsWithGamesUsecase.execute();

    return response.json(list);
  }
}

export { ListAllCourtsWithGamesController };
