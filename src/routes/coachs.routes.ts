import { Router } from "express";

import { CreateCoachController } from "@modules/coachs/useCases/createCoach/CreateCoachController";
import { ListCoachController } from "@modules/coachs/useCases/listCoachs/ListCoachController";
import { UpdateCoachController } from "@modules/coachs/useCases/updateCoach/UpdateCoachController";

const coachsRoutes = Router();

const listCoachController = new ListCoachController();
const createCoachController = new CreateCoachController();
const updateCoachController = new UpdateCoachController();

coachsRoutes.get("/", listCoachController.handle);
coachsRoutes.post("/", createCoachController.handle);
coachsRoutes.put("/:id", updateCoachController.handle);

export { coachsRoutes };
