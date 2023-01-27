import { DependentsRepositoryInMemory } from "@modules/dependents/repositories/in-memory/DependentsRepositoryInMemory";
import { MembersRepositoryInMemory } from "@modules/members/repositories/in-memory/MembersRepositoryInMemory";

import { ListDependentsUseCase } from "./ListDependentsUseCase";

let listDependentsUseCase: ListDependentsUseCase;
let dependentsRepositoryInMemory: DependentsRepositoryInMemory;
let membersRepositoryInMemory: MembersRepositoryInMemory;

describe("Suite List Dependents tests", () => {
  beforeEach(() => {
    dependentsRepositoryInMemory = new DependentsRepositoryInMemory();
    membersRepositoryInMemory = new MembersRepositoryInMemory();

    listDependentsUseCase = new ListDependentsUseCase(
      dependentsRepositoryInMemory
    );
  });

  it("Should be able to list all depedents of the member", async () => {
    const memberCreated = await membersRepositoryInMemory.create({
      name: "Member list dependent",
      registration: "1234",
      status: "ok",
      type: "member",
    });

    const dependentCreated = await membersRepositoryInMemory.create({
      name: "Dependent list",
      registration: "1234",
      status: "ok",
      type: "dependent",
    });

    const dependentChilds = await dependentsRepositoryInMemory.create({
      player_id: dependentCreated.id,
      member_id: memberCreated.id,
    });

    const depedents = await listDependentsUseCase.execute(memberCreated.id);

    expect(depedents).toEqual([dependentChilds]);
  });
});
