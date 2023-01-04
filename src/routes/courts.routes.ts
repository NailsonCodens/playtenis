import { Router } from "express";

import { CreateCourtController } from "../modules/courts/useCases/createCourt/CreateCourtController";
import { ListCourtController } from "../modules/courts/useCases/listCourts/ListCourtController";

const courtRouter = Router();

const createCourtController = new CreateCourtController();
const listCourtController = new ListCourtController();

courtRouter.post("/", createCourtController.handle);
courtRouter.get("/", listCourtController.handle);

export { courtRouter };
