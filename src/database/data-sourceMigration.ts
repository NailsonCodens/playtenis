import "reflect-metadata";
import { DataSource } from "typeorm";

import orm from "../../orm.json";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: orm.DB_HOST_MIGRATION,
  port: 5432,
  username: orm.DB_USER,
  password: orm.DB_PASSWORD,
  database: orm.DB,
  synchronize: false,
  logging: false,
  migrations: [orm.DB_PATH_MIGRATION],
});

AppDataSource.initialize();
