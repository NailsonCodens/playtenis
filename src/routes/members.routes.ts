import { Router } from "express";

import { CreateMemberController } from "@modules/members/useCases/CreateMember/CreateMemberController";
import { DeleteMemberController } from "@modules/members/useCases/DeleteMember/DeleteMemberController";
import { ListMembersController } from "@modules/members/useCases/ListMembers/ListMembersCotroller";
import { UpdateMemberController } from "@modules/members/useCases/UpdateMember/UpdateMemberController";

const membersRoute = Router();

const createMemberController = new CreateMemberController();
const listMembersController = new ListMembersController();
const updateMemberController = new UpdateMemberController();
const deleteMemberController = new DeleteMemberController();

membersRoute.post("/", createMemberController.handle);
membersRoute.get("/", listMembersController.handle);
membersRoute.put("/:id", updateMemberController.handle);
membersRoute.delete("/:id", deleteMemberController.handle);

export { membersRoute };
