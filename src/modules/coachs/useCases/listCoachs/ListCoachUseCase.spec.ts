import { CoachsRepositoryInMemory } from "@modules/coachs/repositories/in-memory/CoachsRepositoryInMemory";

import { CreateCoachUseCase } from "../createCoachs/CreateCoachUseCase";
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
    let name = "Coach 1";
    await createCoachUseCase.execute({ name });

    name = "Coach 2";
    await createCoachUseCase.execute({ name });

    const coachs = await listCoachUseCase.execute();

    expect(coachs).toEqual(expect.arrayContaining(coachs));
  });
});
