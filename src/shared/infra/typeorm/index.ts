import { DataSource } from "typeorm"

const dataSource = new DataSource({
  type: "postgres",
  port: 5433,
  username: "igor",
  password: "1010",
  database:
    process.env.NODE_ENV === "test"
      ? "low_price_PSQL_test"
      : "low_price_PSQL_local",
  entities: ["src/modules/**/infra/typeorm/entities/**/*.ts"],
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
})

export function createConnection(host = "localhost"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize()
}

export default dataSource
