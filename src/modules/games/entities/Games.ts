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
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
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

  @Column("varchar", {
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value.toLocaleString("pt-BR", { timeZone: "UTC" });
      },
    },
  })
  start_time_game: Date;

  @Column("varchar", {
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value.toLocaleString("pt-BR", { timeZone: "UTC" });
      },
    },
  })
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

  @CreateDateColumn({
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value.toLocaleString("pt-BR");
      },
    },
  })
  created_at: Date;

  @UpdateDateColumn({
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value.toLocaleString("pt-BR");
      },
    },
  })
  updated_at: Date;

  @DeleteDateColumn({
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value == null ? value : value.toLocaleString("pt-BR");
      },
    },
  })
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    this.date_game = new Date().toISOString().slice(0, 10);
  }
}

export { Games };
