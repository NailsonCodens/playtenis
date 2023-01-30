import { Router } from "express";

import { AddGameInQueueController } from "@modules/queue/useCase/addGameInQueue/AddGameInQueueController";
import { ListQueueController } from "@modules/queue/useCase/listQueue/ListQueueController";
import { ListQueueByPlayersController } from "@modules/queue/useCase/listQueueByPlayers/ListQueueByPlayersController";

const queueRoutes = Router();

const addGameInQueueController = new AddGameInQueueController();
const listQueueController = new ListQueueController();
const listQueueByPlayersController = new ListQueueByPlayersController();

queueRoutes.post("/", addGameInQueueController.handle);
queueRoutes.get("/", listQueueController.handle);
queueRoutes.get("/by-players", listQueueByPlayersController.handle);

export { queueRoutes };
