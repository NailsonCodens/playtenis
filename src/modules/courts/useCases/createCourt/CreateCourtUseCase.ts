import { ICourtDTO } from "@modules/courts/dtos/ICourtDTO";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { inject, injectable } from "tsyringe";

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
