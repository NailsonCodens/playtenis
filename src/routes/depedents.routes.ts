import { Router } from "express";

import { CreateDependentController } from "@modules/dependents/useCases/createDependent/CreateDependentController";

const dependentsRouter = Router();

const dependentController = new CreateDependentController();

dependentsRouter.post("/:member_id", dependentController.handle);

export { dependentsRouter };
