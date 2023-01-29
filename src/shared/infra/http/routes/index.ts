import { Router } from "express"
import { authenticateRoutes } from "./user/authenticate.route"

const router = Router()

router.use(authenticateRoutes)

export { router }
