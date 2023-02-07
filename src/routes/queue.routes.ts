import { Router } from "express";

import { AddGameInQueueController } from "@modules/queue/useCase/addGameInQueue/AddGameInQueueController";
import { ListQueueController } from "@modules/queue/useCase/listQueue/ListQueueController";
import { ListQueueByPlayersController } from "@modules/queue/useCase/listQueueByPlayers/ListQueueByPlayersController";
import { UpdateQueueIsPlayedController } from "@modules/queue/useCase/updateQueueIsPlayed/UpdateQueueIsPlayedController";

const queueRoutes = Router();

const addGameInQueueController = new AddGameInQueueController();
const listQueueController = new ListQueueController();
const listQueueByPlayersController = new ListQueueByPlayersController();
const updateQueueIslPlayed = new UpdateQueueIsPlayedController();

queueRoutes.post("/", addGameInQueueController.handle);
queueRoutes.get("/", listQueueController.handle);
queueRoutes.get("/by-players", listQueueByPlayersController.handle);
queueRoutes.put("/is-played/:id", updateQueueIslPlayed.handle);

export { queueRoutes };
