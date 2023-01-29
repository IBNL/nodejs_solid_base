import { body } from "express-validator"

export default [
  body("email", "email is required").notEmpty(),
  body("email", "email is valid").isEmail(),
  body("password", "password is required").notEmpty(),
]
