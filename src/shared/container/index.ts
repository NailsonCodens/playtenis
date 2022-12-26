import "reflect-metadata";
import { container } from "tsyringe";

import { ICourtsRepository } from "../../modules/repositories/ICourtsRepository";
import { CourtsRepository } from "../../modules/repositories/implementation/CourtsRespository";
import { UserRepository } from "../../modules/repositories/implementation/UserRepository";
import { IUserRepository } from "../../modules/repositories/IUserRepository";

container.registerSingleton<ICourtsRepository>(
  "CourtsRepository",
  CourtsRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
