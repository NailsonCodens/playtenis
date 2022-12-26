import { Users } from "../entities/Users";
import { IUserDTO } from "../useCases/users/IUserDTO";

interface IUserRepository {
  findById(id: string): Users;
  findByLogin(login: string): Users;
  list(): Users[];
  create({ name, login, password }: IUserDTO): void;
  update({ id, name, login, password }: IUserDTO): Users;
}

export { IUserRepository };
