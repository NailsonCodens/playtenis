import { Router } from "express";

import { CreateModalityController } from "@modules/modalities/useCases/createModality/CreateModalityController";
import { DeleteModalityController } from "@modules/modalities/useCases/deleteModality/DeleteModalityController";
import { ListModalityController } from "@modules/modalities/useCases/listModalities/ListModalityController";
import { ListModalityByIdController } from "@modules/modalities/useCases/listModalityById/ListModalityByIdController";
import { UpdateModalityController } from "@modules/modalities/useCases/updateModality/UpdateModalityController";

const modalitiesRoutes = Router();

const createModalityController = new CreateModalityController();
const listModalityController = new ListModalityController();
const listModalityByIdController = new ListModalityByIdController();
const updateModalityController = new UpdateModalityController();
const deleteModalityController = new DeleteModalityController();

modalitiesRoutes.post("/", createModalityController.handle);
modalitiesRoutes.get("/", listModalityController.handle);
modalitiesRoutes.get("/:id", listModalityByIdController.handle);
modalitiesRoutes.put("/:id", updateModalityController.handle);
modalitiesRoutes.delete("/:id", deleteModalityController.handle);
export { modalitiesRoutes };
