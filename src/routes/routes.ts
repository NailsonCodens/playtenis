import { Router } from "express";

import { coachsRoutes } from "./coachs.routes";
import { courtRouter } from "./courts.routes";
import { membersRoute } from "./members.routes";
import { modalitiesRoutes } from "./modalities.routes";
import { userRoute } from "./users.routes";

const generalRoutes = Router();

generalRoutes.use("/users", userRoute);
generalRoutes.use("/courts", courtRouter);
generalRoutes.use("/players", membersRoute);
generalRoutes.use("/modalities", modalitiesRoutes);
generalRoutes.use("/coachs", coachsRoutes);

export default generalRoutes;
