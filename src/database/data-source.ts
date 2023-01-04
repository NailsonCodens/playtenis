import "reflect-metadata";
import { DataSource } from "typeorm";

import { Courts } from "../modules/courts/entities/Courts";
import { Modalities } from "../modules/modalities/entities/Modalities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_playtenis",
  port: 5432,
  username: "docker",
  password: "playtenis",
  database: "playtenis",
  synchronize: false,
  logging: false,
  migrations: ["./src/database/migrations/*.ts"],
  entities: [Modalities, Courts],
});

AppDataSource.initialize();
