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
  host: "database_playtenis",
  port: 5432,
  username: "docker",
  password: "playtenis",
  database: "playtenis",
  synchronize: false,
  logging: false,
  useUTC: true,
  migrations: ["./src/database/migrations/*.ts"],
  entities: [Modalities, Courts, Coachs, Members, Dependents, Games, Queue],
});

AppDataSource.initialize();
