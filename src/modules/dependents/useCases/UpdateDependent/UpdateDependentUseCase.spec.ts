import { AppError } from "@errors/AppError";
import { DependentsRepositoryInMemory } from "@modules/dependents/repositories/in-memory/DependentsRepositoryInMemory";
import { MembersRepositoryInMemory } from "@modules/members/repositories/in-memory/MembersRepositoryInMemory";

import { UpdateDependentUseCase } from "./UpdateDependentUseCase";

let updateDepedentUseCase: UpdateDependentUseCase;
let dependentsRepositoryInMemory: DependentsRepositoryInMemory;
let membersRepositoryInMemory: MembersRepositoryInMemory;
describe("Suite Update Dependent tests", () => {
  beforeEach(() => {
    dependentsRepositoryInMemory = new DependentsRepositoryInMemory();
    membersRepositoryInMemory = new MembersRepositoryInMemory();
    updateDepedentUseCase = new UpdateDependentUseCase(
      dependentsRepositoryInMemory,
      membersRepositoryInMemory
    );
  });

  it("Should be able to update a dependent of the member", async () => {
    let name = "Member 01";

    await membersRepositoryInMemory.create({
      name,
      registration: "12222",
      status: "ok",
    });

    const memberCreated = await membersRepositoryInMemory.findByName(name);

    name = "dependent test";

    await dependentsRepositoryInMemory.create({
      member_id: memberCreated.id,
      name,
    });

    const dependentCreated = await dependentsRepositoryInMemory.findByName(
      name
    );

    const { id } = dependentCreated;

    name = "dependent updated";

    const depedentUpdated = await updateDepedentUseCase.execute({
      id,
      name,
      member_id: memberCreated.id,
    });

    expect(depedentUpdated).toHaveProperty("id", id);
    expect(depedentUpdated).toHaveProperty("name", name);
  });

  it("Should not be able to update a dependent if non-existing", async () => {
    const name = "Member 01";

    await membersRepositoryInMemory.create({
      name,
      registration: "12222",
      status: "ok",
    });

    const memberCreated = await membersRepositoryInMemory.findByName(name);

    const { id } = memberCreated;

    expect(async () => {
      await updateDepedentUseCase.execute({
        id: "22222",
        name,
        member_id: id,
      });
    }).rejects.toEqual(new AppError("Este dependente não existe"));
  });

  it("Should not be able to update a dependent if member non-existing ", async () => {
    const name = "dependent";
    await dependentsRepositoryInMemory.create({
      name,
      member_id: "1234",
    });

    const dependentCreated = await dependentsRepositoryInMemory.findByName(
      name
    );

    const { id } = dependentCreated;

    expect(async () => {
      await updateDepedentUseCase.execute({
        id,
        name: "depedent",
        member_id: "2121321",
      });
    }).rejects.toEqual(new AppError("Este membro do clube não existe"));
  });
});
