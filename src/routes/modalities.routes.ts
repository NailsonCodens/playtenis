import { Router } from "express";

import { CreateModalityControler } from "../modules/modalities/useCases/createModality/CreateModalityController";
import { ListModalityController } from "../modules/modalities/useCases/listModalities/ListModalityController";
import { UpdateModalityController } from "../modules/modalities/useCases/updateModality/UpdateModalityController";

const modalitiesRoutes = Router();

const createModalityController = new CreateModalityControler();
const listModalityController = new ListModalityController();
const updateModalityController = new UpdateModalityController();

modalitiesRoutes.post("/", createModalityController.handle);
modalitiesRoutes.get("/", listModalityController.handle);
modalitiesRoutes.put("/:id", updateModalityController.handle);
export { modalitiesRoutes };
