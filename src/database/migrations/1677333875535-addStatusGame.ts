import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addStatusGame1677333875535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "games",
      new TableColumn({
        name: "status",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("games", "status");
  }
}
