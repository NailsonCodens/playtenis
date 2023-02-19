import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class playersQueue1676765638163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "players_queue",
        columns: [
          {
            name: "player_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "queue_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKQueuePlayers",
            referencedTableName: "queue",
            referencedColumnNames: ["id"],
            columnNames: ["queue_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKPlayersQueue",
            referencedTableName: "players",
            referencedColumnNames: ["id"],
            columnNames: ["player_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("players_queue");
  }
}
