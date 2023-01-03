import { Router } from "express";

import { CreateModalityControler } from "../modules/modalities/useCases/createModality/CreateModalityController";

const modalitiesRoutes = Router();

const createModalityController = new CreateModalityControler();

modalitiesRoutes.post("/", createModalityController.handle);

export { modalitiesRoutes };
