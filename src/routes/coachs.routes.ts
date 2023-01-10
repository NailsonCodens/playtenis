import { ListCoachController } from "@modules/coachs/useCases/listCoachs/ListCoachController";
import { Router } from "express";

const coachsRoutes = Router();

const listCoachController = new ListCoachController();

coachsRoutes.get("/", listCoachController.handle);

export { coachsRoutes };
