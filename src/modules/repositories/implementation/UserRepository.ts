import { User } from "../../models/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  all(): User[] {
    return this.users;
  }
  findById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  create({ name, login, password }: User): void {
    const user = new User();

    Object.assign(user, {
      name,
      login,
      password,
    });

    this.users.push(user);
  }
  update({ id, name, login, password }: User): User {
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
