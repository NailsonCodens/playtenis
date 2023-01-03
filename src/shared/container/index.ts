import "reflect-metadata";
import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/repositories/implementation/UsersRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { ICourtsRepository } from "../../modules/courts/repositories/ICourtsRepository";
import { CourtsRepository } from "../../modules/courts/repositories/implementation/CourtsRespository";
import { IModalitiesRepository } from "../../modules/modalities/repositories/IModalitiesRepository";
import { ModalitiesRespository } from "../../modules/modalities/repositories/implementations/ModalitiesRespository";

container.registerSingleton<IUserRepository>("UserRepository", UsersRepository);

container.registerSingleton<ICourtsRepository>(
  "CourtsRepository",
  CourtsRepository
);

container.registerSingleton<IModalitiesRepository>(
  "ModalitiesRespository",
  ModalitiesRespository
);
