import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class queue1675080222281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "queue",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "modality_id",
            type: "uuid",
          },
          {
            name: "court_id",
            type: "uuid",
          },
          {
            name: "players",
            type: "varchar",
          },
          {
            name: "played",
            type: "varchar",
            default: "'no'",
            isNullable: false,
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("queue");
  }
}
