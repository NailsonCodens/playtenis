import "reflect-metadata";
import { container } from "tsyringe";

import { ICourtsRepository } from "../../modules/repositories/ICourtsRepository";
import { CourtsRepository } from "../../modules/repositories/implementation/CourtiesRespoitory";

container.registerSingleton<ICourtsRepository>(
  "CourtsRepository",
  CourtsRepository
);
