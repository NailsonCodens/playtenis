import { Router } from "express";

import { CreateCourtController } from "../modules/courts/useCases/createCourt/CreateCourtController";

const courtRouter = Router();

const createController = new CreateCourtController();

courtRouter.post("/", createController.handle);

export { courtRouter };
