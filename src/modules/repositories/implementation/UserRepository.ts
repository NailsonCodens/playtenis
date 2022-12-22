import { User } from "../../entities/User";
import { IUserDTO } from "../../useCases/users/IUserDTO";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  list(): User[] {
    return this.users;
  }
  findById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  findByLogin(login: string): User {
    const user = this.users.find((user) => user.login === login);
    return user;
  }

  create({ name, login, password }: IUserDTO): void {
    const user = new User();

    Object.assign(user, {
      name,
      login,
      password,
    });

    this.users.push(user);
  }
  update({ id, name, login, password }: IUserDTO): User {
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

export { UserRepository };
