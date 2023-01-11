import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteCourtUseCase {
  constructor(
    @inject("CourtsRepository") private courtsRepository: ICourtsRepository
  ) {}

  async execute({ id }): Promise<void> {
    const courtAlredyExists = await this.courtsRepository.findById(id);

    if (!courtAlredyExists) {
      throw new Error("Esta quadra não existe");
    }

    await this.courtsRepository.delete(id);
  }
}

export { DeleteCourtUseCase };
