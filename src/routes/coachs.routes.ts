import { Router } from "express";

import { ListCoachController } from "../modules/coachs/useCases/listCoachs/ListCoachController";

const coachsRoutes = Router();

const listCoachController = new ListCoachController();

coachsRoutes.get("/", listCoachController.handle);

export { coachsRoutes };
