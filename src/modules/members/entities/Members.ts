import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Dependents } from "@modules/dependents/entities/Dependents";

@Entity("players")
class Members {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  registration: string;

  @Column("varchar")
  type: string;

  @Column("varchar")
  status: string;

  @OneToMany(() => Dependents, (depedents) => depedents.member)
  dependents: Dependents[];

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

    if (!this.type) {
      this.type = "member";
    }
  }
}

export { Members };
