import { v4 as uuidV4 } from "uuid";

import { AppError } from "@errors/AppError";
import { CoachsRepositoryInMemory } from "@modules/coachs/repositories/in-memory/CoachsRepositoryInMemory";

import { CreateCoachUseCase } from "../createCoach/CreateCoachUseCase";
import { UpdateCoachUseCase } from "./UpdateCoachUseCase";

describe("Suite UpdateCoach", () => {
  let updateCoachUseCase: UpdateCoachUseCase;
  let coachsRepositoryInMemory: CoachsRepositoryInMemory;
  let createCoachUseCase: CreateCoachUseCase;

  beforeEach(() => {
    coachsRepositoryInMemory = new CoachsRepositoryInMemory();
    createCoachUseCase = new CreateCoachUseCase(coachsRepositoryInMemory);
    updateCoachUseCase = new UpdateCoachUseCase(coachsRepositoryInMemory);
  });

  it("Should be able to update an existing ", async () => {
    let name = "Coach to update 1";

    await createCoachUseCase.execute({ name });

    const coach = await coachsRepositoryInMemory.findByName(name);

    const { id } = coach;
    name = "Coach updated";

    const coachUpdated = await updateCoachUseCase.execute({ id, name });

    expect(coachUpdated).toHaveProperty("name", name);
  });

  it("Should not be able to update a coach if not exists", async () => {
    const name = "Coach to update 1";

    expect(async () => {
      await createCoachUseCase.execute({ name });

      const id = uuidV4();
      await updateCoachUseCase.execute({ id, name });
    }).rejects.toBeInstanceOf(AppError);
  });
});
