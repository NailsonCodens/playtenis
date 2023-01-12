import { CoachsRepositoryInMemory } from "@modules/coachs/repositories/in-memory/CoachsRepositoryInMemory";

import { CreateCoachUseCase } from "./CreateCoachUseCase";

describe("Suite Create Coach", () => {
  let createCoachUseCase: CreateCoachUseCase;
  let coachsRepositoryInMemory: CoachsRepositoryInMemory;

  beforeEach(() => {
    coachsRepositoryInMemory = new CoachsRepositoryInMemory();
    createCoachUseCase = new CreateCoachUseCase(coachsRepositoryInMemory);
  });

  it("Should be able to create a new coach", async () => {
    const name = "Coach one";
    await createCoachUseCase.execute({ name });

    const coach = await coachsRepositoryInMemory.findByName(name);

    expect(coach).toHaveProperty("id");
  });

  it("Should not be able to create a coach if already exists", async () => {
    expect(async () => {
      const name = "Coach one";

      await createCoachUseCase.execute({ name });

      await createCoachUseCase.execute({ name });
    }).rejects.toBeInstanceOf(Error);
  });
});
