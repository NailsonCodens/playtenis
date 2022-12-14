import { User } from "../models/User";

interface IUserRepository {
  all(): User;
  findById({ id }): User;
  create({ name, login, password }): void;
  update({ id, name, login, password }): User;
}

export { IUserRepository };
