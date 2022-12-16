import { User } from "../models/User";

interface IUserRepository {
  all(): User[];
  findById(id: string): User;
  create({ name, login, password }: User): void;
  update({ id, name, login, password }: User): User;
}

export { IUserRepository };
