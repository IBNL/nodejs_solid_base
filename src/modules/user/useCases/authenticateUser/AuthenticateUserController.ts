import { Request, Response } from "express"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { container } from "tsyringe"

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const ip_address = request.ip

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const credentials = await authenticateUserUseCase.execute({
      email,
      password,
      ip_address,
    })

    return response.json(credentials)
  }
}
export { AuthenticateUserController }
