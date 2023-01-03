import { Router } from "express";

import { CreateModalityControler } from "../modules/modalities/useCases/createModality/CreateModalityController";
import { ListModalityController } from "../modules/modalities/useCases/ListModalities/ListModalityController";

const modalitiesRoutes = Router();

const createModalityController = new CreateModalityControler();
const listModalityController = new ListModalityController();

modalitiesRoutes.post("/", createModalityController.handle);
modalitiesRoutes.get("/", listModalityController.handle);

export { modalitiesRoutes };
