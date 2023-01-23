import { AppError } from "@errors/AppError";
import { CourtsRepositoryInMemory } from "@modules/courts/repositories/in-memory/CourtsRepositoryInMemory";

import { DeleteCourtUseCase } from "./DeleteCourtUseCase";

let courtRepositoryInMemory: CourtsRepositoryInMemory;
let deleteCourtUseCase: DeleteCourtUseCase;

describe("Suite Create Court", () => {
  beforeEach(() => {
    courtRepositoryInMemory = new CourtsRepositoryInMemory();
    deleteCourtUseCase = new DeleteCourtUseCase(courtRepositoryInMemory);
  });

  it("Should be able to delete an existing court", async () => {
    const name = "Court 1";

    await courtRepositoryInMemory.create({
      name,
      status: "ok",
    });

    const courtExpectedInArray = await courtRepositoryInMemory.findByName(name);

    const { id } = courtExpectedInArray;

    await deleteCourtUseCase.execute({ id });

    const courtExpected = await courtRepositoryInMemory.list();

    expect(courtExpected).toEqual(
      expect.not.objectContaining(courtExpectedInArray)
    );
  });

  it("Should not be able to delete court if non-existing", async () => {
    expect(async () => {
      const id = "non-existing";
      await deleteCourtUseCase.execute({ id });
    }).rejects.toBeInstanceOf(AppError);
  });
});
