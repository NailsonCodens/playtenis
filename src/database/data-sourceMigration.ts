import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "playtenis",
  database: "playtenis",
  synchronize: false,
  logging: false,
  useUTC: true,
  migrations: ["./src/database/migrations/*.ts"],
});

AppDataSource.initialize();
