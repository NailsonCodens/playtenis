import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("modalities")
class Modalities {
  @PrimaryColumn("uuid")
  id: string;
  @Column("varchar")
  name: string;
  @Column("varchar")
  amount_players: string;
  @Column("varchar")
  time: number;
  @Column("varchar")
  status: string;
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

export { Modalities };
