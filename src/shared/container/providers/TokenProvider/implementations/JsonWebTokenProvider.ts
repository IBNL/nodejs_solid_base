import auth from "@config/auth"
import { sign } from "jsonwebtoken"
import { ITokenProvider } from "../ITokenProvider"

class JsonWebTokenProvider implements ITokenProvider {
  create(user_id: string): string {
    const { secret_token, expires_in_token_minutes } = auth

    const access_token = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token_minutes,
    })
    return access_token
  }
}

export { JsonWebTokenProvider }
