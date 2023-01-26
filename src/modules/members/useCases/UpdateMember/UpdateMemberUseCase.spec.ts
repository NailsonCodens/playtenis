import { v4 as uuidV4 } from "uuid";

import { AppError } from "@errors/AppError";
import { MembersRepositoryInMemory } from "@modules/members/repositories/in-memory/MembersRepositoryInMemory";

import { UpdateMemberUseCase } from "./UpdateMemberUseCase";

let updateMemberUseCase: UpdateMemberUseCase;
let membersRepositoryInMemory: MembersRepositoryInMemory;

describe("Suite tests update member use case", () => {
  beforeEach(() => {
    membersRepositoryInMemory = new MembersRepositoryInMemory();
    updateMemberUseCase = new UpdateMemberUseCase(membersRepositoryInMemory);
  });

  it("Should be able to update a member existent", async () => {
    let name = "Membro 1";

    await membersRepositoryInMemory.create({
      name,
      registration: "72347",
      status: "ok",
    });

    const memberAlredyExist = await membersRepositoryInMemory.findByName(name);

    const { id } = memberAlredyExist;

    name = "Membro updated";

    const member = await updateMemberUseCase.execute({
      id,
      name,
      registration: "55555",
      status: "ok",
    });

    expect(member).toHaveProperty("name", name);
  });

  it("Should not be able to update a member if not exists", async () => {
    expect(async () => {
      const name = "Membro 1";

      await membersRepositoryInMemory.create({
        name,
        registration: "72347",
        status: "ok",
      });

      const id = uuidV4();

      await updateMemberUseCase.execute({
        id,
        name,
        registration: "123344",
        status: "ok",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
