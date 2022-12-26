import { Router } from "express";

import { CreateCourtController } from "../modules/useCases/courts/createCourt/CreateCourtController";

const courtRouter = Router();

const createController = new CreateCourtController();

courtRouter.post("/", createController.handle);

export { courtRouter };
