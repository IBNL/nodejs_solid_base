import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@modules/user/repositories/IUsersRepository"
import { IUsersTokensRepository } from "@modules/user/repositories/IUsersTokensRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import auth from "@config/auth"
import { compare } from "bcrypt"
import { InvalidCredentials } from "@shared/errors/InvalidCredentials"
import { ITokenProvider } from "@shared/container/providers/TokenProvider/ITokenProvider"

interface IResponse {
  user: {
    name: string
    email: string
  }
  access_token: string
}

interface IRequest {
  email: string
  password: string
  ip_address: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("JsonWebTokenProvider")
    private TokenProvider: ITokenProvider
  ) {}

  async execute({ email, password, ip_address }: IRequest) {
    const user = await this.userRepository.findByEmail(email)
    const { expires_in_token_minutes } = auth

    if (!user) {
      throw new InvalidCredentials()
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new InvalidCredentials()
    }

    const access_token = this.TokenProvider.create(user.id)

    const token_expires_date = this.dateProvider.addMinute(
      expires_in_token_minutes
    )

    await this.usersTokensRepository.create({
      user_id: user.id,
      ip_address,
      access_token,
      expires_date: token_expires_date,
    })

    const credentials: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      access_token,
    }

    return credentials
  }
}

export { AuthenticateUserUseCase }
