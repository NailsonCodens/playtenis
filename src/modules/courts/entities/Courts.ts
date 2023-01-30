import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Courts };
