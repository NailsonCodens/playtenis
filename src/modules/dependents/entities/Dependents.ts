import { v4 as uuidV4 } from "uuid";

class Dependentes {
  id: string;
  member_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Dependentes };
