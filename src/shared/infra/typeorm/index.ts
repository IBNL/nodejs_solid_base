import { DataSource } from "typeorm"
require("dotenv").config()

const dataSource = new DataSource({
  type: "postgres",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DB_TEST_DATABASE
      : process.env.DB_LOCAL_DATABASE,
  entities: ["src/modules/**/infra/typeorm/entities/**/*.ts"],
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
})

export function createConnection(host = "localhost"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize()
}

export default dataSource
