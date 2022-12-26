import { Router } from "express";

import { CreateUserController } from "../modules/useCases/users/createUser/CreateUserController";

const userRoute = Router();

const createUserController = new CreateUserController();

userRoute.post("/", createUserController.handle);

export { userRoute };
