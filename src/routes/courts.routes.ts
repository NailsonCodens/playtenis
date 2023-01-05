import { Router } from "express";

import { CreateCourtController } from "../modules/courts/useCases/createCourt/CreateCourtController";
import { DeleteCourtControler } from "../modules/courts/useCases/deleteCourt/DeleteCourtController";
import { ListCourtController } from "../modules/courts/useCases/listCourts/ListCourtController";

const courtRouter = Router();

const createCourtController = new CreateCourtController();
const listCourtController = new ListCourtController();
const deleteCourtController = new DeleteCourtControler();

courtRouter.post("/", createCourtController.handle);
courtRouter.get("/", listCourtController.handle);
courtRouter.delete("/", deleteCourtController.handle);

export { courtRouter };
