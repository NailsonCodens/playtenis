import { AppError } from "@errors/AppError";
import { DependentsRepositoryInMemory } from "@modules/dependents/repositories/in-memory/DependentsRepositoryInMemory";
import { MembersRepositoryInMemory } from "@modules/members/repositories/in-memory/MembersRepositoryInMemory";

import { DeleteDependentUseCase } from "./DeleteDependentUseCase";

let deleteDependentUseCase: DeleteDependentUseCase;
let dependentsRepositoryInMemory: DependentsRepositoryInMemory;
let membersRepositoryInMemory: MembersRepositoryInMemory;

describe("Suite Update Dependent tests", () => {
  beforeEach(() => {
    dependentsRepositoryInMemory = new DependentsRepositoryInMemory();
    membersRepositoryInMemory = new MembersRepositoryInMemory();

    deleteDependentUseCase = new DeleteDependentUseCase(
      dependentsRepositoryInMemory,
      membersRepositoryInMemory
    );
  });

  it("Should be able to delete a dependent", async () => {
    const memberDelete = {
      name: "coach1",
      registration: "45566",
      status: "ok",
      type: "dependent",
    };
    await membersRepositoryInMemory.create(memberDelete);

    const dependentCreated = await membersRepositoryInMemory.findByName(
      memberDelete.name,
      memberDelete.type
    );

    const { id } = dependentCreated;

    const dependentsExpected = await membersRepositoryInMemory.list();

    await deleteDependentUseCase.execute(id);

    expect(dependentsExpected).toEqual(
      expect.not.objectContaining(dependentCreated)
    );
  });

  it("Should not be able to delete a dependent if non-existing", async () => {
    const member_id = "123467";

    expect(async () => {
      await deleteDependentUseCase.execute(member_id);
    }).rejects.toEqual(
      new AppError(
        "Este dependente não existe, por tanto não pode ser deletado"
      )
    );
  });
});
