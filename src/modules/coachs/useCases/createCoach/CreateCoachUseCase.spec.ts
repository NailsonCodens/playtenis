import { AppError } from "@errors/AppError";
import { CoachsRepositoryInMemory } from "@modules/coachs/repositories/in-memory/CoachsRepositoryInMemory";

import { CreateCoachUseCase } from "./CreateCoachUseCase";

let createCoachUseCase: CreateCoachUseCase;
let coachsRepositoryInMemory: CoachsRepositoryInMemory;

describe("Suite Create Coach", () => {
  beforeEach(() => {
    coachsRepositoryInMemory = new CoachsRepositoryInMemory();
    createCoachUseCase = new CreateCoachUseCase(coachsRepositoryInMemory);
  });

  it("Should be able to create a new coach", async () => {
    const name = "Coach one";
    const registration = "545555";
    await createCoachUseCase.execute({ name, registration, status: "ok" });

    const coach = await coachsRepositoryInMemory.findByName(name);

    expect(coach).toHaveProperty("id");
  });

  it("Should not be able to create a coach if already exists", async () => {
    expect(async () => {
      const name = "Coach one";

      await createCoachUseCase.execute({
        name,
        registration: "45434",
        status: "ok",
      });

      await createCoachUseCase.execute({
        name,
        registration: "45434",
        status: "ok",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
