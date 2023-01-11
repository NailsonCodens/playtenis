import { IUserDTO } from "../dtos/IUserDTO";
import { Users } from "../entities/Users";

interface IUserRepository {
  findById(id: string): Users;
  findByLogin(login: string): Users;
  list(): Users[];
  create({ name, login, password }: IUserDTO): void;
  update({ id, name, login, password }: IUserDTO): Users;
}

export { IUserRepository };
