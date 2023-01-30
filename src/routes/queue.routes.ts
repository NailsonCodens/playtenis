import { Router } from "express";

import { AddGameInQueueController } from "@modules/queue/useCase/addGameInQueue/AddGameInQueueController";
import { ListQueueController } from "@modules/queue/useCase/listQueue/ListQueueController";

const queueRoutes = Router();

const addGameInQueueController = new AddGameInQueueController();
const listQueueController = new ListQueueController();

queueRoutes.post("/", addGameInQueueController.handle);
queueRoutes.get("/", listQueueController.handle);
export { queueRoutes };
