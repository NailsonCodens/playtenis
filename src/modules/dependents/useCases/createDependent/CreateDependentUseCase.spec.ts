import { AppError } from "@errors/AppError";
import { DependentsRepositoryInMemory } from "@modules/dependents/repositories/in-memory/DependentsRepositoryInMemory";
import { MembersRepositoryInMemory } from "@modules/members/repositories/in-memory/MembersRepositoryInMemory";

import { CreateDependentUseCase } from "./CreateDependentUseCase";

let createDependentUseCase: CreateDependentUseCase;
let dependentsRepositoryInMemory: DependentsRepositoryInMemory;
let memberRepositoryInMemory: MembersRepositoryInMemory;

describe("Suite create dependent", () => {
  beforeEach(() => {
    dependentsRepositoryInMemory = new DependentsRepositoryInMemory();
    memberRepositoryInMemory = new MembersRepositoryInMemory();
    createDependentUseCase = new CreateDependentUseCase(
      dependentsRepositoryInMemory,
      memberRepositoryInMemory
    );
  });

  it("Should be able to create a new dependent of the member", async () => {
    let name = "Member 01";

    await memberRepositoryInMemory.create({
      name,
      registration: "0001",
      status: "ok",
    });

    const member = await memberRepositoryInMemory.findByName(name);

    name = "Dependente 01";

    await createDependentUseCase.execute({ name, member_id: member.id });

    const dependent = await dependentsRepositoryInMemory.findByName(name);

    expect(dependent).toHaveProperty("id");
  });

  it("Should not be able to create a new dependent of the member if dependent alredy exists with the same name", async () => {
    expect(async () => {
      let name = "Member 01";

      await memberRepositoryInMemory.create({
        name,
        registration: "0001",
        status: "ok",
      });

      const member = await memberRepositoryInMemory.findByName(name);

      name = "Dependente 01";

      await createDependentUseCase.execute({ name, member_id: member.id });

      name = "Dependente 01";

      await createDependentUseCase.execute({ name, member_id: member.id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new dependent of the member if member not exists", async () => {
    const name = "Dependente 01";
    expect(async () => {
      await createDependentUseCase.execute({ name, member_id: "123" });
    }).rejects.toBeInstanceOf(AppError);
  });
});
