import { AppError } from "@errors/AppError";
import { DependentsRepositoryInMemory } from "@modules/dependents/repositories/in-memory/DependentsRepositoryInMemory";

import { DeleteDependentUseCase } from "./DeleteDependentUseCase";

let deleteDependentUseCase: DeleteDependentUseCase;
let dependentsRepositoryInMemory: DependentsRepositoryInMemory;
describe("Suite Update Dependent tests", () => {
  beforeEach(() => {
    dependentsRepositoryInMemory = new DependentsRepositoryInMemory();
    deleteDependentUseCase = new DeleteDependentUseCase(
      dependentsRepositoryInMemory
    );
  });

  it("Should be able to delete a dependent", async () => {
    const member_id = "1234";
    const name = "dependent delete";

    await dependentsRepositoryInMemory.create({
      name,
      member_id,
    });

    const dependentCreated = await dependentsRepositoryInMemory.findByName(
      name
    );

    const { id } = dependentCreated;

    const dependentsExpected = await dependentsRepositoryInMemory.list(
      member_id
    );

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
