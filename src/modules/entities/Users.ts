import { v4 as uuidV4 } from "uuid";

class Users {
  id?: string;
  name: string;
  surname: string;
  login: string;
  password: string;
  created_at?: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Users };
