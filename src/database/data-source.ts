import "reflect-metadata";
import { DataSource } from "typeorm";

import { Dependents } from "@modules/dependents/entities/Dependents";
import { Games } from "@modules/games/entities/Games";
import { Members } from "@modules/members/entities/Members";
import { Queue } from "@modules/queue/entities/Queue";

import orm from "../../orm.json";
import { Coachs } from "../modules/coachs/entities/Coachs";
import { Courts } from "../modules/courts/entities/Courts";
import { Modalities } from "../modules/modalities/entities/Modalities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: orm.DB_HOST,
  port: 5432,
  username: orm.DB_USER,
  password: orm.DB_PASSWORD,
  database: orm.DB,
  useUTC: true,
  migrations: [orm.DB_PATH_MIGRATION],
  entities: [Modalities, Courts, Coachs, Members, Dependents, Games, Queue],
});

AppDataSource.initialize().then(async () => {
  console.log("Connection initialized with database...");
});
