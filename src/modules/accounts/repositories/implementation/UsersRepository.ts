import { IUserDTO } from "../../dtos/IUserDTO";
import { Users } from "../../entities/Users";
import { IUserRepository } from "../IUserRepository";

class UsersRepository implements IUserRepository {
  private users: Users[];

  constructor() {
    this.users = [];
  }

  list(): Users[] {
    return this.users;
  }
  findById(id: string): Users {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  findByLogin(login: string): Users {
    const user = this.users.find((user) => user.login === login);
    return user;
  }

  create({ name, login, password }: IUserDTO): void {
    const user = new Users();

    Object.assign(user, {
      name,
      login,
      password,
    });

    this.users.push(user);
  }
  update({ id, name, login, password }: IUserDTO): Users {
    const user = this.findById(id);

    Object.assign(user, {
      name,
      login,
      password,
      updated_at: new Date(),
    });

    return user;
  }
}

export { UsersRepository };
