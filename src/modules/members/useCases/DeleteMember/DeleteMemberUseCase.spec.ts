import { AppError } from "@errors/AppError";
import { MembersRepositoryInMemory } from "@modules/members/repositories/in-memory/MembersRepositoryInMemory";

import { DeleteMemberUseCase } from "./DeleteMemberUseCase";

let deleteMemberUseCase: DeleteMemberUseCase;
let membersRepositoryInMemory: MembersRepositoryInMemory;
describe("Suite Update Dependent tests", () => {
  beforeEach(() => {
    membersRepositoryInMemory = new MembersRepositoryInMemory();
    deleteMemberUseCase = new DeleteMemberUseCase(membersRepositoryInMemory);
  });

  it("Should be able to delete a member with yours dependents", async () => {
    const name = "member delete";

    await membersRepositoryInMemory.create({
      name,
      registration: "12345",
      status: "ok",
    });

    const memberCreated = await membersRepositoryInMemory.findByName(name);

    const { id } = memberCreated;

    const membersExpected = await membersRepositoryInMemory.list();

    await deleteMemberUseCase.execute(id);

    expect(membersExpected).toEqual(expect.not.objectContaining(memberCreated));
  });

  it("Should not be able to delete a member if non-existing", async () => {
    const member_id = "123467";

    expect(async () => {
      await deleteMemberUseCase.execute(member_id);
    }).rejects.toEqual(
      new AppError("Este membro não existe, por tanto não pode ser deletado")
    );
  });
});
