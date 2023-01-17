import { AppError } from "@errors/AppError";
import { ModalityRepositoryInMemory } from "@modules/modalities/repositories/in-memory/ModalityRepositoryInMemory";

import { CreateModalityUseCase } from "./CreateModalityUseCase";

let createModalityUseCase: CreateModalityUseCase;
let modalityRepositoryInMemory: ModalityRepositoryInMemory;

describe("Suite create modality", () => {
  beforeEach(() => {
    modalityRepositoryInMemory = new ModalityRepositoryInMemory();
    createModalityUseCase = new CreateModalityUseCase(
      modalityRepositoryInMemory
    );
  });

  it("Should be able create a modality", async () => {
    const name = "Modalidade One";

    await createModalityUseCase.execute({
      name,
      amount_players: "4",
      time: 90,
      status: "ok",
    });

    const modality = await modalityRepositoryInMemory.findByName(name);

    expect(modality).toHaveProperty("id");
  });

  it("Should not be able to create a modality if modality alredy exists", async () => {
    expect(async () => {
      const name = "Modalidade One";

      await createModalityUseCase.execute({
        name,
        amount_players: "4",
        time: 90,
        status: "ok",
      });

      await createModalityUseCase.execute({
        name,
        amount_players: "2",
        time: 35,
        status: "ok",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
