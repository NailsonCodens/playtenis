import { IUserRepository } from "../../../repositories/IUserRepository";
import { IUserDTO } from "../IUserDTO";

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute({ name, surname, login, password }: IUserDTO): void {
    const user = this.userRepository.findByLogin(login);

    if (user) {
      throw new Error(
        "Este usuário já existe, por favor tente com outro login"
      );
    }

    this.userRepository.create({ name, surname, login, password });
  }
}

export { CreateUserUseCase };
