import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Members } from "@modules/members/entities/Members";

@Entity("queue")
class Queue {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  modality_id: string;

  @Column("varchar")
  played: string;

  @ManyToMany(() => Members)
  @JoinTable({
    name: "players_queue",
    joinColumns: [{ name: "queue_id" }],
    inverseJoinColumns: [{ name: "player_id" }],
  })
  players: Members[];

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
  }
}

export { Queue };
