import { ICreateUserTokenDTO } from "@modules/user/dtos/ICreateUserTokenDTO"
import { IUsersTokensRepository } from "@modules/user/repositories/IUsersTokensRepository"
import dataSource from "@shared/infra/typeorm"
import { Repository } from "typeorm"
import { UserTokens } from "../entities/UserTokens"

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = dataSource.getRepository(UserTokens)
  }

  async create({
    expires_date,
    access_token,
    user_id,
    ip_address,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      access_token,
      user_id,
      ip_address,
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findByUserIdAndToken(
    user_id: string,
    access_token: string
  ): Promise<UserTokens> {
    const usersTokens = await this.repository.findOneBy({
      user_id,
      access_token,
    })
    return usersTokens
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByToken(access_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOneBy({
      access_token,
    })

    return userToken
  }
}

export { UsersTokensRepository }
