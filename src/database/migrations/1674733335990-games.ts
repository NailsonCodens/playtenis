import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class games1674733335990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "games",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "court_id",
            type: "uuid",
          },
          {
            name: "modality_id",
            type: "uuid",
          },
          {
            name: "modality_time",
            type: "varchar",
          },
          {
            name: "start_time_game",
            type: "timestamp",
          },
          {
            name: "end_time_game",
            type: "timestamp",
          },
          {
            name: "date_game",
            type: "timestamp",
            default: "now()",
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
            name: "FKCourtGame",
            referencedTableName: "courts",
            referencedColumnNames: ["id"],
            columnNames: ["court_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKModalityGame",
            referencedTableName: "modalities",
            referencedColumnNames: ["id"],
            columnNames: ["modality_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("games");
  }
}
