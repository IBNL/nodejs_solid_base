import { ICreateUserTokenDTO } from "@modules/user/dtos/ICreateUserTokenDTO"
import { UserTokens } from "@modules/user/infra/typeorm/entities/UserTokens"
import { IUsersTokensRepository } from "../IUsersTokensRepository"

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = []

  async create({
    expires_date,
    access_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()
    Object.assign(userToken, {
      expires_date,
      access_token,
      user_id,
    })

    this.usersTokens.push(userToken)

    return userToken
  }

  async findByUserIdAndToken(
    user_id: string,
    access_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.access_token === access_token
    )

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === id)
    this.usersTokens.splice(this.usersTokens.indexOf(userToken))
  }

  async findByToken(access_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (ut) => ut.access_token === access_token
    )
    return userToken
  }
}

export { UsersTokensRepositoryInMemory }
