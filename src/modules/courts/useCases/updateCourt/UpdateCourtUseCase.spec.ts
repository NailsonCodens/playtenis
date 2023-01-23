import { AppError } from "@errors/AppError";
import { CourtsRepositoryInMemory } from "@modules/courts/repositories/in-memory/CourtsRepositoryInMemory";

import { UpdateCourtUseCase } from "./UpdateCourtUseCase";

let courtRepositoryInMemory: CourtsRepositoryInMemory;
let updateCourtUseCase: UpdateCourtUseCase;

describe("Suite Create Court", () => {
  beforeEach(() => {
    courtRepositoryInMemory = new CourtsRepositoryInMemory();
    updateCourtUseCase = new UpdateCourtUseCase(courtRepositoryInMemory);
  });

  it("Should be able to udpdate an existing court", async () => {
    const name = "Court 1";

    await courtRepositoryInMemory.create({
      name,
      status: "ok",
    });

    const court = await courtRepositoryInMemory.findByName(name);

    const { id } = court;

    const courtUpdated = await updateCourtUseCase.execute({
      id,
      name,
      status: "ok",
    });

    expect(courtUpdated).toHaveProperty("id");
    expect(courtUpdated).toHaveProperty("name", name);
  });

  it("Should not be able to udpdate an existing court if non-existing", async () => {
    expect(async () => {
      const name = "Court 1";

      await updateCourtUseCase.execute({
        id: "non-existing-id",
        name,
        status: "ok",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
