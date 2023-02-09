import { Router } from "express";

import { CreateCourtController } from "@modules/courts/useCases/createCourt/CreateCourtController";
import { DeleteCourtControler } from "@modules/courts/useCases/deleteCourt/DeleteCourtController";
import { ListAllCourtsWithGamesController } from "@modules/courts/useCases/listAllCourtsWithGames/ListAllCourtsWithGamesController";
import { ListCourtByIdController } from "@modules/courts/useCases/listCourtById/ListCourtByIdController";
import { ListCourtController } from "@modules/courts/useCases/listCourts/ListCourtController";
import { UpdateCourtController } from "@modules/courts/useCases/updateCourt/UpdateCourtController";

const courtRouter = Router();

const createCourtController = new CreateCourtController();
const listCourtController = new ListCourtController();
const listCourtByidController = new ListCourtByIdController();
const listAllCourtsWithGamesController = new ListAllCourtsWithGamesController();
const updateCourtController = new UpdateCourtController();
const deleteCourtController = new DeleteCourtControler();

courtRouter.post("/", createCourtController.handle);
courtRouter.get("/", listCourtController.handle);
courtRouter.get("/:id", listCourtByidController.handle);
courtRouter.get("/with-games", listAllCourtsWithGamesController.handle);
courtRouter.put("/:id", updateCourtController.handle);
courtRouter.delete("/:id", deleteCourtController.handle);

export { courtRouter };
