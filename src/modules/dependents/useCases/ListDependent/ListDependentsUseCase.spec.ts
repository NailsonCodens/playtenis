import { DependentsRepositoryInMemory } from "@modules/dependents/repositories/in-memory/DependentsRepositoryInMemory";

import { ListDependentsUseCase } from "./ListDependentsUseCase";

let listDependentsUseCase: ListDependentsUseCase;
let dependentsRepositoryInMemory: DependentsRepositoryInMemory;

describe("Suite List Dependents tests", () => {
  beforeEach(() => {
    dependentsRepositoryInMemory = new DependentsRepositoryInMemory();
    listDependentsUseCase = new ListDependentsUseCase(
      dependentsRepositoryInMemory
    );
  });

  it("Should be able to list all depedents of the member", async () => {
    const member_id = "123";
    const name = "Depedent test";

    await dependentsRepositoryInMemory.create({
      name,
      member_id,
    });

    const dependentExpected = await dependentsRepositoryInMemory.findByName(
      name
    );

    const depedents = await listDependentsUseCase.execute(member_id);

    expect(depedents).toEqual([dependentExpected]);
  });

  it("Should be able to list all depedents of the member", async () => {
    const member_id = "123";
    const name = "Depedent test";

    await dependentsRepositoryInMemory.create({
      name,
      member_id,
    });

    const dependentExpected = await dependentsRepositoryInMemory.findByName(
      name
    );

    const depedents = await listDependentsUseCase.execute(member_id);

    expect(depedents).toEqual([dependentExpected]);
  });
});
