import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Dependents1674151639808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "dependents",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "player_id",
            type: "uuid",
          },
          {
            name: "member_id",
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
        ],
        foreignKeys: [
          {
            name: "FKPlayerDependent",
            referencedTableName: "players",
            referencedColumnNames: ["id"],
            columnNames: ["player_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKMemberDependent",
            referencedTableName: "players",
            referencedColumnNames: ["id"],
            columnNames: ["member_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("dependents");
  }
}
