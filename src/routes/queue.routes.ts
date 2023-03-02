import { Router } from "express";

import { AddGameInQueueController } from "@modules/queue/useCase/addGameInQueue/AddGameInQueueController";
import { AddPlayersInQueueController } from "@modules/queue/useCase/addPlayersInQueue/AddPlayersInQueueController";
import { DeleteQueueController } from "@modules/queue/useCase/deleteQueue/DeleteQueueController";
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
const deleteQueueController = new DeleteQueueController();

/* const addPlayersInQueueController = new AddPlayersInQueueController(); */

queueRoutes.post("/", addGameInQueueController.handle);
/* queueRoutes.post("/players", addPlayersInQueueController.handle); */
queueRoutes.get("/", listQueueController.handle);
queueRoutes.get("/:id", listQueueByIdController.handle);
queueRoutes.get("/by-players", listQueueByPlayersController.handle);
queueRoutes.put("/is-played/:id", updateQueueIslPlayed.handle);
queueRoutes.delete("/:id", deleteQueueController.handle);

export { queueRoutes };
