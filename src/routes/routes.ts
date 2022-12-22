import { Router } from "express";

import { courtRouter } from "./courts.routes";
import { membersRoute } from "./members.routes";
import { userRoute } from "./users.routes";

const generalRoutes = Router();

generalRoutes.get("/", (request, response) => {
  return response.status(201).json({ message: "it's ok." });
});

generalRoutes.use("/users", userRoute);
generalRoutes.use("courts", courtRouter);
generalRoutes.use("/players", membersRoute);

export { generalRoutes };
