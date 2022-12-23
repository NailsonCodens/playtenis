import { User } from "../entities/Users";
import { IUserDTO } from "../useCases/users/IUserDTO";

interface IUserRepository {
  findById(id: string): User;
  findByLogin(login: string): User;
  list(): User[];
  create({ name, login, password }: IUserDTO): void;
  update({ id, name, login, password }: IUserDTO): User;
}

export { IUserRepository };
