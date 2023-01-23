import { CourtsRepositoryInMemory } from "@modules/courts/repositories/in-memory/CourtsRepositoryInMemory";

import { CreateCourtUseCase } from "./CreateCourtUseCase";

let courtRepositoryInMemory: CourtsRepositoryInMemory;
let createCourtUseCase: CreateCourtUseCase;

describe("Suite Create Court", () => {
  beforeEach(() => {
    courtRepositoryInMemory = new CourtsRepositoryInMemory();
    createCourtUseCase = new CreateCourtUseCase(courtRepositoryInMemory);
  });

  it("Should be able to create a new court", async () => {
    const name = "Court 1";

    await createCourtUseCase.execute({
      name,
      status: "ok",
    });

    const court = await courtRepositoryInMemory.findByName(name);

    expect(court).toHaveProperty("id");
  });

  it("Should not be able to create a new court if alredy exists", async () => {
    const name = "Court 1";

    expect(async () => {
      await createCourtUseCase.execute({
        name,
        status: "ok",
      });

      await createCourtUseCase.execute({
        name,
        status: "off",
      });
    });
  });
});
