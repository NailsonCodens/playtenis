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

    await membersRepositoryInMemory.create({
      name,
      registration: "12345",
      status: "ok",
    });

    const member = await membersRepositoryInMemory.findByName(name);

    const users = await listMembersUseCase.execute();

    expect(users).toEqual([member]);
  });
});
