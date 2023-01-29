import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

export async function CheckRules(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const errors = validationResult(request)
  const extractedErrors: { [key: string]: string }[] = []

  if (errors.isEmpty()) {
    return next()
  }

  errors.array().map(({ param, msg }) => extractedErrors.push({ [param]: msg }))

  const formattedErrors = extractedErrors.reduce(
    (errorsAccumulator: { [key: string]: string[] }, currentErrorObject) => {
      for (const [key, value] of Object.entries(currentErrorObject)) {
        errorsAccumulator[key] = [...(errorsAccumulator[key] || []), value]
      }
      return errorsAccumulator
    },
    {}
  )

  response.status(422).json({
    errors: formattedErrors,
  })
}
