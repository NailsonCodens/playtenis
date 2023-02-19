import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PlayersGame1674734326536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "players_games",
        columns: [
          {
            name: "player_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "game_id",
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
            name: "FKGamePlayers",
            referencedTableName: "games",
            referencedColumnNames: ["id"],
            columnNames: ["game_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKPlayersGame",
            referencedTableName: "players",
            referencedColumnNames: ["id"],
            columnNames: ["player_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("players_games");
  }
}
