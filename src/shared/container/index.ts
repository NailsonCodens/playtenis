import "reflect-metadata";
import { container } from "tsyringe";

import { ICourtsRepository } from "../../modules/repositories/ICourtsRepository";
import { CourtsRepository } from "../../modules/repositories/implementation/CourtsRespository";

container.registerSingleton<ICourtsRepository>(
  "CourtsRepository",
  CourtsRepository
);
