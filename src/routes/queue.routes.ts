import { Router } from "express";

import { AddGameInQueueController } from "@modules/queue/useCase/addGameInQueue/AddGameInQueueController";

const queueRoutes = Router();

const addGameInQueueController = new AddGameInQueueController();

queueRoutes.post("/", addGameInQueueController.handle);

export { queueRoutes };
