import { Router } from "express";

import { CreateGamesController } from "@modules/games/useCases/createGames/CreateGamesController";
import { CreatePlayersInGameController } from "@modules/games/useCases/createPlayersInGame/CreatePlayersInGameController";

const gamesRouter = Router();

const createGamesController = new CreateGamesController();
const createPlayersInGamesController = new CreatePlayersInGameController();

gamesRouter.post("/", createGamesController.handle);
gamesRouter.post("/players", createPlayersInGamesController.handle);
export { gamesRouter };
