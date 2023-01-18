import { Router } from "express";

import { CreateMemberController } from "@modules/members/useCases/CreateMember/CreateMemberController";
import { ListMembersController } from "@modules/members/useCases/ListMembers/ListMembersCotroller";

const membersRoute = Router();

const createMemberController = new CreateMemberController();
const listMembersController = new ListMembersController();

membersRoute.post("/", createMemberController.handle);
membersRoute.get("/", listMembersController.handle);

export { membersRoute };
