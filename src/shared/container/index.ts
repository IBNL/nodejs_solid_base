import { container } from "tsyringe"

import "@shared/container/providers/"

import { IUsersRepository } from "@modules/user/repositories/IUsersRepository"
import { UsersRepository } from "@modules/user/infra/typeorm/repositories/UsersRepository"

import { IUsersTokensRepository } from "@modules/user/repositories/IUsersTokensRepository"
import { UsersTokensRepository } from "@modules/user/infra/typeorm/repositories/UsersTokensRepository"

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
)
