import { AppError } from "./AppError"

class InvalidCredentials extends AppError {
  constructor() {
    super("Invalid credentials!", 422)
  }
}

export { InvalidCredentials }
