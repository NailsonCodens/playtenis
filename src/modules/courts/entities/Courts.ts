import { v4 as uuidV4 } from "uuid";

class Courts {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Courts };
