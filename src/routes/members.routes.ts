import { Router } from "express";

import { CreateMemberController } from "@modules/members/useCases/CreateMember/CreateMemberController";
import { ListMembersController } from "@modules/members/useCases/ListMembers/ListMembersCotroller";
import { UpdateMemberController } from "@modules/members/useCases/UpdateMember/UpdateMemberController";

const membersRoute = Router();

const createMemberController = new CreateMemberController();
const listMembersController = new ListMembersController();
const updateMemberController = new UpdateMemberController();

membersRoute.post("/", createMemberController.handle);
membersRoute.get("/", listMembersController.handle);
membersRoute.put("/:id", updateMemberController.handle);

export { membersRoute };
