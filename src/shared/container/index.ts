import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/repositories/implementation/UsersRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICoachsRepository } from "@modules/coachs/repositories/ICoachsRepository";
import { CoachsRepository } from "@modules/coachs/repositories/implementation/CoachsRepository";
import { ICourtsRepository } from "@modules/courts/repositories/ICourtsRepository";
import { CourtsRepository } from "@modules/courts/repositories/implementation/CourtsRespository";
import { IDependentsRepository } from "@modules/dependents/repositories/IDependentsRepository";
import { DependentsRepository } from "@modules/dependents/repositories/implementation/DependentsRepository";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { GamesRepository } from "@modules/games/repositories/implementation/GamesRepository";
import { IMembersRepository } from "@modules/members/repositories/IMembersRepository";
import { MembersRepository } from "@modules/members/repositories/implementation/MembersRepository";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";
import { ModalitiesRespository } from "@modules/modalities/repositories/implementations/ModalitiesRespository";
import { QueueRepository } from "@modules/queue/repositories/implementation/QueueRepository";
import { IQueueRepository } from "@modules/queue/repositories/IQueueRepository";

container.registerSingleton<IUserRepository>("UserRepository", UsersRepository);

container.registerSingleton<ICourtsRepository>(
  "CourtsRepository",
  CourtsRepository
);

container.registerSingleton<IModalitiesRepository>(
  "ModalitiesRespository",
  ModalitiesRespository
);

container.registerSingleton<ICoachsRepository>(
  "CoachsRepository",
  CoachsRepository
);

container.registerSingleton<IMembersRepository>(
  "MembersRepository",
  MembersRepository
);

container.registerSingleton<IDependentsRepository>(
  "DependentsRepository",
  DependentsRepository
);

container.registerSingleton<IGamesRepository>(
  "GamesRepository",
  GamesRepository
);

container.registerSingleton<IQueueRepository>(
  "QueueRepository",
  QueueRepository
);
