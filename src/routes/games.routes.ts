import { Router } from "express";

import { CreateGamesController } from "@modules/games/useCases/CreateGames/CreateGamesController";

const gamesRouter = Router();

const createGamesController = new CreateGamesController();

gamesRouter.post("/", createGamesController.handle);

export { gamesRouter };
