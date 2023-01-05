import { Router } from "express";

import { CreateCourtController } from "../modules/courts/useCases/createCourt/CreateCourtController";
import { ListCourtController } from "../modules/courts/useCases/listCourts/ListCourtController";
import { UpdateCourtController } from "../modules/courts/useCases/updateCourt/UpdateCourtController";

const courtRouter = Router();

const createCourtController = new CreateCourtController();
const listCourtController = new ListCourtController();
const updateCourtController = new UpdateCourtController();

courtRouter.post("/", createCourtController.handle);
courtRouter.get("/", listCourtController.handle);
courtRouter.put("/:id", updateCourtController.handle);

export { courtRouter };
