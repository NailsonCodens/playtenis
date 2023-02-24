import { Router } from "express";

import { AddGameInQueueController } from "@modules/queue/useCase/addGameInQueue/AddGameInQueueController";
import { AddPlayersInQueueController } from "@modules/queue/useCase/addPlayersInQueue/AddPlayersInQueueController";
import { ListQueueController } from "@modules/queue/useCase/listQueue/ListQueueController";
import { ListQueueByIdController } from "@modules/queue/useCase/listQueueById/ListQueueByIdController";
import { ListQueueByPlayersController } from "@modules/queue/useCase/listQueueByPlayers/ListQueueByPlayersController";
import { UpdateQueueIsPlayedController } from "@modules/queue/useCase/updateQueueIsPlayed/UpdateQueueIsPlayedController";

const queueRoutes = Router();

const addGameInQueueController = new AddGameInQueueController();
const listQueueController = new ListQueueController();
const listQueueByPlayersController = new ListQueueByPlayersController();
const listQueueByIdController = new ListQueueByIdController();
const updateQueueIslPlayed = new UpdateQueueIsPlayedController();
/* const addPlayersInQueueController = new AddPlayersInQueueController(); */

queueRoutes.post("/", addGameInQueueController.handle);
/* queueRoutes.post("/players", addPlayersInQueueController.handle); */
queueRoutes.get("/", listQueueController.handle);
queueRoutes.get("/:id", listQueueByIdController.handle);
queueRoutes.get("/by-players", listQueueByPlayersController.handle);
queueRoutes.put("/is-played/:id", updateQueueIslPlayed.handle);

export { queueRoutes };
