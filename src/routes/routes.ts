import { Router } from "express";

import { coachsRoutes } from "./coachs.routes";
import { courtRouter } from "./courts.routes";
import { dependentsRouter } from "./depedents.routes";
import { gamesRouter } from "./games.routes";
import { membersRoute } from "./members.routes";
import { modalitiesRoutes } from "./modalities.routes";
import { userRoute } from "./users.routes";

const generalRoutes = Router();

generalRoutes.use("/users", userRoute);
generalRoutes.use("/courts", courtRouter);
generalRoutes.use("/players", membersRoute);
generalRoutes.use("/modalities", modalitiesRoutes);
generalRoutes.use("/coachs", coachsRoutes);
generalRoutes.use("/members", membersRoute);
generalRoutes.use("/dependents", dependentsRouter);
generalRoutes.use("/games", gamesRouter);
export default generalRoutes;
