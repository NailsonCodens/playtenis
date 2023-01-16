import { v4 as uuidV4 } from "uuid";

import { ModalityRepositoryInMemory } from "@modules/modalities/repositories/in-memory/ModalityRepositoryInMemory";

import { UpdateModalityUseCase } from "./UpdateModalityUseCase";

describe("Suite Update Modality", () => {
  let updateModalityUseCase: UpdateModalityUseCase;
  let modalityRepositoryInMemory: ModalityRepositoryInMemory;

  beforeEach(() => {
    modalityRepositoryInMemory = new ModalityRepositoryInMemory();
    updateModalityUseCase = new UpdateModalityUseCase(
      modalityRepositoryInMemory
    );
  });

  it("Should be able to update a modality", async () => {
    let name = "Modality one update";

    await modalityRepositoryInMemory.create({
      name,
      amount_players: "4",
      time: 120,
      status: "ok",
    });

    const modality = await modalityRepositoryInMemory.findByName(name);

    const { id } = modality;
    name = "Modality one updated";

    const modalityUpdated = await updateModalityUseCase.execute({
      id,
      name,
      amount_players: "2",
      time: 90,
      status: "ok",
    });

    expect(modalityUpdated).toHaveProperty("name", name);
  });

  it("Should not be able to update an non existent modality", async () => {
    expect(async () => {
      const name = "Modality to update";

      await modalityRepositoryInMemory.create({
        name,
        amount_players: "4",
        time: 120,
        status: "ok",
      });

      const id = uuidV4();

      await updateModalityUseCase.execute({
        id,
        name,
        amount_players: "4",
        time: 120,
        status: "ok",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
