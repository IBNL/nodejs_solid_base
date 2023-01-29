import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"
import { UserTokens } from "../infra/typeorm/entities/UserTokens"

interface IUsersTokensRepository {
  create({
    expires_date,
    access_token,
    user_id,
    ip_address,
  }: ICreateUserTokenDTO): Promise<UserTokens>
  findByUserIdAndToken(userId: string, token: string): Promise<UserTokens>
  deleteById(id: string): Promise<void>
  findByToken(access_token: string): Promise<UserTokens>
}

export { IUsersTokensRepository }
