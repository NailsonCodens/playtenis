import { inject, injectable } from "tsyringe";

import { IUserDTO } from "../../dtos/IUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ name, surname, login, password }: IUserDTO): Promise<void> {
    const userAlredyExists = await this.userRepository.findByLogin(login);
    if (userAlredyExists) {
      throw new Error(
        "Este usuário já existe, por favor tente com outro login"
      );
    }

    this.userRepository.create({ name, surname, login, password });
  }
}

export { CreateUserUseCase };
