import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("queue")
class Queue {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  modality_id: string;

  @Column("varchar")
  court_id: string;

  @Column("varchar")
  players: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export { Queue };
