import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("games")
class Games {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  court_id: string;

  @Column("varchar")
  modality_id: string;

  @Column("varchar")
  modality_time: number;

  @Column("varchar")
  start_time_game: Date;

  @Column("varchar")
  end_time_game: Date;

  @Column("varchar")
  date_game: string;

  @Column("varchar")
  created_at: Date;

  @Column("varchar")
  updated_at: Date;

  @Column("varchar")
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    this.date_game = new Date().toISOString().slice(0, 10);
  }
}

export { Games };
