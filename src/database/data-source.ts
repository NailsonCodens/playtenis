import "reflect-metadata";
import { DataSource } from "typeorm";

import { Dependents } from "@modules/dependents/entities/Dependents";
import { Games } from "@modules/games/entities/Games";
import { Members } from "@modules/members/entities/Members";
import { Queue } from "@modules/queue/entities/Queue";

import { Coachs } from "../modules/coachs/entities/Coachs";
import { Courts } from "../modules/courts/entities/Courts";
import { Modalities } from "../modules/modalities/entities/Modalities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: false,
  logging: false,
  useUTC: true,
  migrations: [process.env.DB_PATH_MIGRATION],
  entities: [Modalities, Courts, Coachs, Members, Dependents, Games, Queue],
});

AppDataSource.initialize();
