import { Expose } from "class-transformer";
import dayjs from "dayjs";
import {
  Column,
  Entity,
  PrimaryColumn,
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
        let newvalue = "";

        if (value) {
          newvalue = value;
        } else {
          newvalue = value;
        }

        return newvalue;
      },
    },
  })
  start_time_game: Date;
  @Expose({ name: "time" })
  time(): number {
    const endTime = dayjs(this.end_time_game);

    const diffBetweenDate = endTime.diff(dayjs(), "minute");

    return diffBetweenDate;
  }

  @Column("varchar", {
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        let newvalue = "";

        if (value) {
          newvalue = value;
        } else {
          newvalue = value;
        }

        return newvalue;
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
        let newvalue = "";

        if (value) {
          newvalue = value.toLocaleString("pt-BR");
        } else {
          newvalue = value;
        }

        return newvalue;
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
        let newvalue = "";

        if (value) {
          newvalue = value.toLocaleString("pt-BR");
        } else {
          newvalue = value;
        }

        return newvalue;
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
        let newvalue = "";

        if (value) {
          newvalue = value.toLocaleString("pt-BR");
        } else {
          newvalue = value;
        }

        return newvalue;
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
