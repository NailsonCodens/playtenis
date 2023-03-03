import { Router } from "express";

import { CreateGamesController } from "@modules/games/useCases/createGames/CreateGamesController";
import { CreatePlayersInGameController } from "@modules/games/useCases/createPlayersInGame/CreatePlayersInGameController";
import { DeleteGameController } from "@modules/games/useCases/deleteGame/DeleteGameController";
import { EndGameController } from "@modules/games/useCases/endGame/EndGameController";
import { ListGamesBYCourtController } from "@modules/games/useCases/listGamesByCourt/ListGamesByCourtController";

const gamesRouter = Router();

const createGamesController = new CreateGamesController();
/* const createPlayersInGamesController = new CreatePlayersInGameController(); */
const listGamesByCourtController = new ListGamesBYCourtController();
/* const deleteGameController = new DeleteGameController(); */
const endGameController = new EndGameController();

gamesRouter.post("/", createGamesController.handle);
/* gamesRouter.post("/players", createPlayersInGamesController.handle); */
gamesRouter.get("/game-court-current/:id", listGamesByCourtController.handle);
/* gamesRouter.delete("/:id", deleteGameController.handle); */
gamesRouter.put("/:id", endGameController.handle);

export { gamesRouter };
