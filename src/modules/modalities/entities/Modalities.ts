import { v4 as uuidV4 } from "uuid";

class Modalities {
  id: string;
  name: string;
  amount_players: string;
  time: number;
  status: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Modalities };
