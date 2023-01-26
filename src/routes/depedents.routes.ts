import { Router } from "express";

import { CreateDependentController } from "@modules/dependents/useCases/createDependent/CreateDependentController";
import { ListDependentsController } from "@modules/dependents/useCases/ListDependent/ListDependentsController";
import { UpdateDepedentController } from "@modules/dependents/useCases/UpdateDependent/UpdateDependentController";

const dependentsRouter = Router();

const createDependentController = new CreateDependentController();
const updateDepedentController = new UpdateDepedentController();
const listDependentController = new ListDependentsController();

dependentsRouter.post("/:member_id", createDependentController.handle);
dependentsRouter.get("/:id", listDependentController.handle);
dependentsRouter.put("/:id", updateDepedentController.handle);

export { dependentsRouter };
