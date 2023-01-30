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
    const memberUpdate = {
      name: "member test",
      registration: "232323",
      status: "ok",
      type: "member",
    };
    const memberCreated = await membersRepositoryInMemory.create(memberUpdate);

    const dependentCreate = {
      name: "dependent test",
      registration: "555555",
      status: "ok",
      type: "dependent",
    };

    const dependentCreated = await membersRepositoryInMemory.create(
      dependentCreate
    );

    const dependentUpdated = await updateDepedentUseCase.execute({
      id: dependentCreated.id,
      name: "dependent updated",
      registration: "555555",
      status: "ok",
      member_id: memberCreated.id,
    });

    expect(dependentUpdated).toHaveProperty("id", dependentCreated.id);
    expect(dependentUpdated).toHaveProperty("name", dependentUpdated.name);
  });

  it("Should not be able to update a dependent if non-existing", async () => {
    const memberUpdate = {
      name: "member test",
      registration: "232323",
      status: "ok",
      type: "dependent",
    };

    await membersRepositoryInMemory.create(memberUpdate);

    const memberCreated = await membersRepositoryInMemory.findByName(
      memberUpdate.name,
      memberUpdate.type
    );

    const { id } = memberCreated;

    expect(async () => {
      await updateDepedentUseCase.execute({
        id: "22222",
        name: "adasd",
        registration: "6565656",
        status: "123213",
        member_id: id,
      });
    }).rejects.toEqual(new AppError("Este dependente não existe"));
  });

  it("Should not be able to update a dependent if member non-existing ", async () => {
    const dependentCreate = {
      name: "member test",
      registration: "232323",
      status: "ok",
      type: "dependent",
    };

    await membersRepositoryInMemory.create(dependentCreate);

    const memberCreated = await membersRepositoryInMemory.findByName(
      dependentCreate.name,
      dependentCreate.type
    );

    const { id } = memberCreated;

    expect(async () => {
      await updateDepedentUseCase.execute({
        id,
        name: "adasd",
        registration: "6565656",
        status: "123213",
        member_id: "12312321321",
      });
    }).rejects.toEqual(new AppError("Este membro do clube não existe"));
  });
});
