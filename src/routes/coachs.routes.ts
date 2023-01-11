import { Router } from "express";

import { CreateCoachController } from "@modules/coachs/useCases/createCoachs/CreateCoachController";
import { ListCoachController } from "@modules/coachs/useCases/listCoachs/ListCoachController";

const coachsRoutes = Router();

const listCoachController = new ListCoachController();
const createCoachController = new CreateCoachController();

coachsRoutes.get("/", listCoachController.handle);
coachsRoutes.post("/", createCoachController.handle);

export { coachsRoutes };
