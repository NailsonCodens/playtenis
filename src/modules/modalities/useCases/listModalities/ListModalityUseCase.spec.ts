import { ModalityRepositoryInMemory } from "@modules/modalities/repositories/in-memory/ModalityRepositoryInMemory";

import { CreateModalityUseCase } from "../createModality/CreateModalityUseCase";
import { ListModalityUseCase } from "./ListModalityUseCase";

let listModalityUseCase: ListModalityUseCase;
let modalityRepositoryInMemory: ModalityRepositoryInMemory;
let createModalityUseCase: CreateModalityUseCase;

describe("Suite List Modality", () => {
  beforeEach(() => {
    modalityRepositoryInMemory = new ModalityRepositoryInMemory();
    listModalityUseCase = new ListModalityUseCase(modalityRepositoryInMemory);
    createModalityUseCase = new CreateModalityUseCase(
      modalityRepositoryInMemory
    );
  });

  it("Should be able to list modalities", async () => {
    await createModalityUseCase.execute({
      name: "Modality 01",
      amount_players: "2",
      time: 90,
      status: "ok",
    });

    const modalities = await listModalityUseCase.execute();

    expect(modalities).toHaveLength(1);
  });
});
