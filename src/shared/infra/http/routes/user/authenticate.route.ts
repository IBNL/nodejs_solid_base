import { Router } from "express"

import { AuthenticateUserController } from "@modules/user/useCases/authenticateUser/AuthenticateUserController"
import { CheckRules } from "@shared/infra/http/middlewares/express-validator/ValidatorCheckRules"

import AuthenticateUserValidator from "@shared/infra/http/middlewares/express-validator/AuthenticateUserValidator"

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post(
  "/login",
  AuthenticateUserValidator,
  CheckRules,
  authenticateUserController.handle
)

export { authenticateRoutes }
