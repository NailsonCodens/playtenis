import { Router } from "express";

import { CreateDependentController } from "@modules/dependents/useCases/createDependent/CreateDependentController";
import { DeleteDependentController } from "@modules/dependents/useCases/DeleteDependent/DeleteDependentController";
import { ListDependentsController } from "@modules/dependents/useCases/ListDependent/ListDependentsController";
import { UpdateDepedentController } from "@modules/dependents/useCases/UpdateDependent/UpdateDependentController";

const dependentsRouter = Router();

const createDependentController = new CreateDependentController();
const updateDepedentController = new UpdateDepedentController();
const listDependentController = new ListDependentsController();
const deleteDependentController = new DeleteDependentController();

dependentsRouter.post("/:member_id", createDependentController.handle);
dependentsRouter.get("/:member_id", listDependentController.handle);
dependentsRouter.put("/:id", updateDepedentController.handle);
dependentsRouter.delete("/:id", deleteDependentController.handle);

export { dependentsRouter };
