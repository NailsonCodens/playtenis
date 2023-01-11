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

export { Modalities };
