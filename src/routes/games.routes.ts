import { Router } from "express";

import { CreateGamesController } from "@modules/games/useCases/createGames/CreateGamesController";
import { CreatePlayersInGameController } from "@modules/games/useCases/createPlayersInGame/CreatePlayersInGameController";
import { ListGamesBYCourtController } from "@modules/games/useCases/listGamesByCourt/ListGamesByCourtController";

const gamesRouter = Router();

const createGamesController = new CreateGamesController();
const createPlayersInGamesController = new CreatePlayersInGameController();
const listGamesByCourtController = new ListGamesBYCourtController();

gamesRouter.post("/", createGamesController.handle);
gamesRouter.post("/players", createPlayersInGamesController.handle);
gamesRouter.get("/game-court-current", listGamesByCourtController.handle);
export { gamesRouter };
