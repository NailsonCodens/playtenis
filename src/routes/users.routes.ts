import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { Router } from "express";

const userRoute = Router();

const createUserController = new CreateUserController();

userRoute.post("/", createUserController.handle);

export { userRoute };
