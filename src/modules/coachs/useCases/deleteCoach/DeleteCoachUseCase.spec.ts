import { v4 as uuidV4 } from "uuid";

import { CoachsRepositoryInMemory } from "@modules/coachs/repositories/in-memory/CoachsRepositoryInMemory";

import { CreateCoachUseCase } from "../createCoach/CreateCoachUseCase";
import { DeleteCoachUseCase } from "./DeleteCoachUseCase";

describe("Suite Delete Coach", () => {
  let deleteCoachUseCase: DeleteCoachUseCase;
  let coachRepositoryInMemory: CoachsRepositoryInMemory;
  let createCoachUseCase: CreateCoachUseCase;

  beforeEach(() => {
    coachRepositoryInMemory = new CoachsRepositoryInMemory();
    createCoachUseCase = new CreateCoachUseCase(coachRepositoryInMemory);
    deleteCoachUseCase = new DeleteCoachUseCase(coachRepositoryInMemory);
  });

  it("Should be able to delete a coach an existing", async () => {
    let name = "Coach to delete";
    await createCoachUseCase.execute({ name });

    name = "Coach to delete 2";
    await createCoachUseCase.execute({ name });

    const coach = await coachRepositoryInMemory.findByName(name);

    const { id } = coach;

    await deleteCoachUseCase.execute({ id });

    const coachsExpected = await coachRepositoryInMemory.list();

    expect(coachsExpected).toEqual(expect.not.objectContaining(coach));
  });

  it("Should not be able to delete a coach if not exists", async () => {
    expect(async () => {
      const name = "Coach to delete";
      await createCoachUseCase.execute({ name });
      const id = uuidV4();

      await deleteCoachUseCase.execute({ id });
    }).rejects.toBeInstanceOf(Error);
  });
});
