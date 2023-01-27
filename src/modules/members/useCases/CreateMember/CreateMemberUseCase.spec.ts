import { AppError } from "@errors/AppError";
import { MembersRepositoryInMemory } from "@modules/members/repositories/in-memory/MembersRepositoryInMemory";

import { CreateMemberUseCase } from "./CreateMemberUSeCase";

let createMemberUseCase: CreateMemberUseCase;
let membersRepositoryInMemory: MembersRepositoryInMemory;

describe("Suite create member", () => {
  beforeEach(() => {
    membersRepositoryInMemory = new MembersRepositoryInMemory();
    createMemberUseCase = new CreateMemberUseCase(membersRepositoryInMemory);
  });

  it("Should be able to create a new member", async () => {
    const name = "Membro";
    const type = "member";

    await createMemberUseCase.execute({
      name,
      registration: "12345",
      status: "ok",
      type,
    });

    const member = await membersRepositoryInMemory.findByName(name, type);

    expect(member).toHaveProperty("id");
  });

  it("Should not ble able to create a new member if alredy exists with the same registration", async () => {
    expect(async () => {
      let name = "Membro 1";
      const type = "member";

      await createMemberUseCase.execute({
        name,
        registration: "12345",
        status: "ok",
        type,
      });

      name = "Membro 2";

      await createMemberUseCase.execute({
        name,
        registration: "12345",
        status: "ok",
        type,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not ble able to create a new member if alredy exists with the same name", async () => {
    expect(async () => {
      let name = "Membro 1";
      const type = "member";

      await createMemberUseCase.execute({
        name,
        registration: "12345",
        status: "ok",
        type,
      });

      name = "Membro 1";

      await createMemberUseCase.execute({
        name,
        registration: "12444",
        status: "ok",
        type,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
