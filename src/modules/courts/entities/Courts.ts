import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Games } from "@modules/games/entities/Games";

@Entity()
class Courts {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  status: string;

  @OneToOne(() => Games, (games) => games.court_id)
  @JoinColumn({
    name: "id",
    referencedColumnName: "court_id",
  })
  games: Games[];

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

export { Courts };
