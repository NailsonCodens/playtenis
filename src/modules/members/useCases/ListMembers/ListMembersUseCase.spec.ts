import { MembersRepositoryInMemory } from "@modules/members/repositories/in-memory/MembersRepositoryInMemory";

import { ListMembersUseCase } from "./ListMembersUseCase";

let listMembersUseCase: ListMembersUseCase;
let membersRepositoryInMemory: MembersRepositoryInMemory;

describe("Suite list members use case", () => {
  beforeEach(() => {
    membersRepositoryInMemory = new MembersRepositoryInMemory();
    listMembersUseCase = new ListMembersUseCase(membersRepositoryInMemory);
  });

  it("Should be able to list members", async () => {
    const name = "Membro 1";
    const type = "member";

    const test = await membersRepositoryInMemory.create({
      name,
      registration: "12345",
      status: "ok",
      type,
    });

    const member = await listMembersUseCase.execute();

    expect(member).toEqual([test]);
  });
});
