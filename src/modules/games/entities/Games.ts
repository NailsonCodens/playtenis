import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Courts } from "@modules/courts/entities/Courts";
import { Members } from "@modules/members/entities/Members";
import { Modalities } from "@modules/modalities/entities/Modalities";

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

  @ManyToMany(() => Members)
  @JoinTable({
    name: "players_games",
    joinColumns: [{ name: "game_id" }],
    inverseJoinColumns: [{ name: "player_id" }],
  })
  players: Members[];

  @OneToOne(() => Courts, (court) => court.id)
  @JoinColumn({
    name: "court_id",
    referencedColumnName: "id",
  })
  courts: Courts;

  @OneToOne(() => Modalities, (modality) => modality.id)
  @JoinColumn({
    name: "modality_id",
    referencedColumnName: "id",
  })
  modality: Modalities;

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
