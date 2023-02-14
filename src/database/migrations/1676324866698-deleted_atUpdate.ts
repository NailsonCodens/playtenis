import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class deletedAtUpdate1676324866698 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "dependents",
      new TableColumn({
        name: "deleted_at",
        type: "timestamp",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("dependents", "deleted_at");
  }
}
