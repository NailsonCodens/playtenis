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
    const name = "Member 01";

    await memberRepositoryInMemory.create({
      name,
      registration: "0001",
      status: "ok",
      type: "member",
    });

    const member = await memberRepositoryInMemory.findByName(name);

    const dependentCreate = {
      name: "Dependente 01",
      registration: "67888",
      status: "ok",
      member_id: member.id,
    };

    await createDependentUseCase.execute(dependentCreate);

    const dependent = await memberRepositoryInMemory.findByName(name);

    expect(dependent).toHaveProperty("id");
  });

  it("Should not be able to create a new dependent of the member if dependent alredy exists with the same name", async () => {
    expect(async () => {
      const name = "Member 01";

      await memberRepositoryInMemory.create({
        name,
        registration: "0001",
        status: "ok",
        type: "member",
      });

      const member = await memberRepositoryInMemory.findByName(name);

      const dependentCreate = {
        name: "Dependente 01",
        registration: "67888",
        status: "ok",
        member_id: member.id,
      };

      await createDependentUseCase.execute(dependentCreate);

      const dependentCreate2 = {
        name: "Dependente 01",
        registration: "67888",
        status: "ok",
        member_id: member.id,
      };

      await createDependentUseCase.execute(dependentCreate2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new dependent of the member if member not exists", async () => {
    expect(async () => {
      const name = "Member 01";

      await memberRepositoryInMemory.create({
        name,
        registration: "0001",
        status: "ok",
        type: "member",
      });

      const dependentCreate = {
        name: "Dependente 01",
        registration: "67888",
        status: "ok",
        member_id: "12313213",
      };

      await createDependentUseCase.execute(dependentCreate);
    }).rejects.toBeInstanceOf(AppError);
  });
});
