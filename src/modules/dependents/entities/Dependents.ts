import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Members } from "@modules/members/entities/Members";

@Entity("dependents")
class Dependents {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  player_id: string;

  @OneToOne(() => Members, (member) => member.id)
  @JoinColumn({
    name: "player_id",
    referencedColumnName: "id",
  })
  player: Members;

  @Column("varchar")
  member_id: string;

  @ManyToOne(() => Members, (member) => member.dependents)
  @JoinColumn({
    name: "member_id",
    referencedColumnName: "id",
  })
  member: Members;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Dependents };
