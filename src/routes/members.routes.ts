import { Router } from "express";

import { CreateMemberController } from "@modules/members/useCases/CreateMember/CreateMemberController";

const membersRoute = Router();

const createMemberController = new CreateMemberController();

membersRoute.post("/", createMemberController.handle);

export { membersRoute };
