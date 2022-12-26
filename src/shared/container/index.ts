import "reflect-metadata";
import { container } from "tsyringe";

import { ICourtsRepository } from "../../modules/repositories/ICourtsRepository";
import { CourtsRepository } from "../../modules/repositories/implementation/CourtsRespository";
import { UsersRepository } from "../../modules/repositories/implementation/UsersRepository";
import { IUserRepository } from "../../modules/repositories/IUserRepository";

container.registerSingleton<ICourtsRepository>(
  "CourtsRepository",
  CourtsRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UsersRepository);
