import { CoachsRepositoryInMemory } from "@modules/coachs/repositories/in-memory/CoachsRepositoryInMemory";

import { CreateCoachUseCase } from "../createCoach/CreateCoachUseCase";
import { ListCoachUseCase } from "./ListCoachUseCase";

describe("Suite List Coachs", () => {
  let listCoachUseCase: ListCoachUseCase;
  let coachsRepositoryInMemory: CoachsRepositoryInMemory;
  let createCoachUseCase: CreateCoachUseCase;

  beforeEach(() => {
    coachsRepositoryInMemory = new CoachsRepositoryInMemory();
    listCoachUseCase = new ListCoachUseCase(coachsRepositoryInMemory);
    createCoachUseCase = new CreateCoachUseCase(coachsRepositoryInMemory);
  });

  it("Shold be able to list coachs", async () => {
    const coach = {
      name: "coach1",
      registration: "45566",
      status: "ok",
    };

    await createCoachUseCase.execute(coach);

    coach.name = "Coach 2";
    await createCoachUseCase.execute(coach);

    const coachs = await listCoachUseCase.execute();

    expect(coachs).toEqual(expect.arrayContaining(coachs));
  });
});
