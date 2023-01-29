import "reflect-metadata"
import { createConnection } from "@shared/infra/typeorm"
import { app } from "./app"

const PORT = 8080
createConnection()

app.listen(PORT, () => console.log("server is running in port:", PORT))
