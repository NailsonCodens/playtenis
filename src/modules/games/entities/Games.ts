import { v4 as uuidV4 } from "uuid";

class Games {
  id: string;

  court_id: string;

  modality_id: string;

  modality_time: string;

  start_time_game: string;

  end_time_game: string;

  date_game: Date;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date;

  contructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Games };
