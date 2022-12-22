import { Router } from "express";

import { createUserController } from "../modules/useCases/users/createUser";

const userRoute = Router();

userRoute.post("/", (request, response) => {
  return createUserController.handle(request, response);
});

export { userRoute };
