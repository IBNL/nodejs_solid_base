import { container } from "tsyringe"
import { IDateProvider } from "./DateProvider/IDateProvider"
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider"
import { JsonWebTokenProvider } from "./TokenProvider/implementations/JsonWebTokenProvider"
import { ITokenProvider } from "./TokenProvider/ITokenProvider"

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)

container.registerSingleton<ITokenProvider>(
  "JsonWebTokenProvider",
  JsonWebTokenProvider
)
