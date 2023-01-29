import { UsersRepositoryInMemory } from "@modules/user/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/user/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

import { hash } from "bcrypt"
import { JsonWebTokenProvider } from "@shared/container/providers/TokenProvider/implementations/JsonWebTokenProvider"
import { InvalidCredentials } from "@shared/errors/InvalidCredentials"
import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let TokenProvider: JsonWebTokenProvider

describe("AuthenticateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    TokenProvider = new JsonWebTokenProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      TokenProvider
    )
  })

  it("should be able to authenticate a user", async () => {
    const password = "passwordTest"
    const password_hash = await hash(password, 8)
    const ip_address = "35.169.224.116"

    const user = {
      name: "teste_name",
      email: "user_test@gmail.com",
      password: password_hash,
      ip_address,
    }

    await usersRepositoryInMemory.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const credentials = await authenticateUserUseCase.execute({
      email: user.email,
      password: password,
      ip_address,
    })

    expect(credentials).toHaveProperty("user.name")
    expect(credentials).toHaveProperty("user.email")
    expect(credentials).toHaveProperty("access_token")
  })

  it("should not be able to authenticate an non existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "falso@gmail.com",
        password: "1234",
        ip_address: "35.169.224.116",
      })
    ).rejects.toEqual(new InvalidCredentials())
  })

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      email: "user@teste.com",
      password: "1234",
      name: "User Test error",
    }

    await usersRepositoryInMemory.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
        ip_address: "35.169.224.116",
      })
    ).rejects.toEqual(new InvalidCredentials())
  })
})
