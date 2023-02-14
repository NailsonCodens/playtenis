import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("queue")
class Queue {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  modality_id: string;

  @Column("varchar")
  players: string;

  @Column("varchar")
  played: string;

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
