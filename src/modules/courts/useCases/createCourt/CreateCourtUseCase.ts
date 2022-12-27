import { inject, injectable } from "tsyringe";

import { ICourtDTO } from "../../dtos/ICourtDTO";
import { ICourtsRepository } from "../../repositories/ICourtsRepository";

@injectable()
class CreateCourtUseCase {
  constructor(
    @inject("CourtsRepository")
    private courtsRepository: ICourtsRepository
  ) {}

  async execute({ name, status }: ICourtDTO): Promise<void> {
    const courtAlredyExists = await this.courtsRepository.findByName(name);

    if (courtAlredyExists) {
      throw new Error("Esta quadra já está cadastrada.");
    }

    this.courtsRepository.create({ name, status });
  }
}

export { CreateCourtUseCase };
