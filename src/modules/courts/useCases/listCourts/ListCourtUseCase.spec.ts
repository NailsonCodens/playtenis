import { AppError } from "@errors/AppError";
import { CourtsRepositoryInMemory } from "@modules/courts/repositories/in-memory/CourtsRepositoryInMemory";

import { ListCourtUseCase } from "./ListCourtUseCase";

let courtRepositoryInMemory: CourtsRepositoryInMemory;
let listCourtUseCase: ListCourtUseCase;

describe("Suite Create Court", () => {
  beforeEach(() => {
    courtRepositoryInMemory = new CourtsRepositoryInMemory();
    listCourtUseCase = new ListCourtUseCase(courtRepositoryInMemory);
  });

  it("Should be able to show an existing courts", async () => {
    const name = "Court 1";

    await courtRepositoryInMemory.create({
      name,
      status: "ok",
    });

    const courtExpectedInArray = await courtRepositoryInMemory.findByName(name);

    const courts = await listCourtUseCase.execute();

    expect(courts).toEqual([courtExpectedInArray]);
  });
});
