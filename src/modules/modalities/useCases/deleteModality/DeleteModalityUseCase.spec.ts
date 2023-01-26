import { v4 as uuidV4 } from "uuid";

import { AppError } from "@errors/AppError";
import { ModalityRepositoryInMemory } from "@modules/modalities/repositories/in-memory/ModalityRepositoryInMemory";

import { DeleteModalityUseCase } from "./DeleteModalityUseCase";

let deleteModalityUseCase: DeleteModalityUseCase;
let modalityRepositoryInMemory: ModalityRepositoryInMemory;

describe("Suite Delete modality", () => {
  beforeEach(() => {
    modalityRepositoryInMemory = new ModalityRepositoryInMemory();
    deleteModalityUseCase = new DeleteModalityUseCase(
      modalityRepositoryInMemory
    );
  });

  it("Should be able to delete a modality", async () => {
    let name = "Modality to delete";

    await modalityRepositoryInMemory.create({
      name,
      amount_players: "4",
      time: 90,
      status: "ok",
    });

    name = "Modality deleted";

    await modalityRepositoryInMemory.create({
      name,
      amount_players: "2",
      time: 120,
      status: "ok",
    });

    const modality = await modalityRepositoryInMemory.findByName(name);

    const { id } = modality;
    await deleteModalityUseCase.execute({ id });

    const modalitiesExpected = await modalityRepositoryInMemory.list();

    expect(modalitiesExpected).toEqual(expect.not.objectContaining(modality));
  });

  it("Should not be able to delete an non existent modality", async () => {
    expect(async () => {
      const name = "Modality to delete";

      await modalityRepositoryInMemory.create({
        name,
        amount_players: "4",
        time: 90,
        status: "ok",
      });

      const id = uuidV4();

      await deleteModalityUseCase.execute({ id });
    }).rejects.toEqual(
      new AppError("Esta modalidade não existe e não pode ser deletada.")
    );
  });
});
