import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity()
class Coachs {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Coachs };
