import { Router } from "express";

import { CreateCoachController } from "@modules/coachs/useCases/createCoach/CreateCoachController";
import { DeleteCoachController } from "@modules/coachs/useCases/deleteCoach/DeleteCoachController";
import { ListCoachByIdController } from "@modules/coachs/useCases/listCoachById/ListCoachByIdController";
import { ListCoachController } from "@modules/coachs/useCases/listCoachs/ListCoachController";
import { UpdateCoachController } from "@modules/coachs/useCases/updateCoach/UpdateCoachController";

const coachsRoutes = Router();

const listCoachController = new ListCoachController();
const listCoachByIdController = new ListCoachByIdController();
const createCoachController = new CreateCoachController();
const updateCoachController = new UpdateCoachController();
const deleteCoachController = new DeleteCoachController();

coachsRoutes.get("/", listCoachController.handle);
coachsRoutes.get("/:id", listCoachByIdController.handle);
coachsRoutes.post("/", createCoachController.handle);
coachsRoutes.put("/:id", updateCoachController.handle);
coachsRoutes.delete("/:id", deleteCoachController.handle);
export { coachsRoutes };
