import { app } from "@shared/infra/http/app"
import { createConnection } from "@shared/infra/typeorm"
import { hash } from "bcrypt"
import request from "supertest"
import { DataSource } from "typeorm"
import { v4 as uuidV4 } from "uuid"

let connection: DataSource

describe("AuthenticateUserController", () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash("password", 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password)
            values ('${id}', 'igor', 'teste_email@gmail.com.br', '${password}')
            `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it("should be able to authenticate a user", async () => {
    const credentials = await request(app).post("/login").send({
      email: "teste_email@gmail.com.br",
      password: "password",
    })

    expect(credentials.status).toBe(200)
    expect(credentials.body).toHaveProperty("user.name")
    expect(credentials.body).toHaveProperty("user.email")
    expect(credentials.body).toHaveProperty("access_token")
  })

  it("should not be able to authenticate with incorrect password", async () => {
    const credentials = await request(app).post("/login").send({
      email: "teste_email@gmail.com.br",
      password: "invalid_password",
    })

    expect(credentials.status).toBe(422)
    expect(credentials.body.message).toBe("Invalid credentials!")
  })

  it("should not be able to authenticate an non existent user", async () => {
    const credentials = await request(app).post("/login").send({
      email: "user_invalid@gmail.com.br",
      password: "password",
    })

    expect(credentials.status).toBe(422)
    expect(credentials.body.message).toBe("Invalid credentials!")
  })

  it("should not be able to authenticate an non existent user and incorrect password", async () => {
    const credentials = await request(app).post("/login").send({
      email: "user_invalid@gmail.com.br",
      password: "invalid_password",
    })

    expect(credentials.status).toBe(422)
    expect(credentials.body.message).toBe("Invalid credentials!")
  })

  it("should not be able to authenticate without password", async () => {
    const credentials = await request(app).post("/login").send({
      email: "teste_email@gmail.com.br",
    })

    expect(credentials.status).toBe(422)
    expect(credentials.body).toHaveProperty("errors.password", [
      "password is required",
    ])
  })

  it("should not be able to authenticate without email", async () => {
    const credentials = await request(app).post("/login").send({
      password: "password",
    })

    expect(credentials.status).toBe(422)
    expect(credentials.body).toHaveProperty("errors.email", [
      "email is required",
      "email is valid",
    ])
  })

  it("should not be able to authenticate without email and password", async () => {
    const credentials = await request(app).post("/login").send({})

    expect(credentials.status).toBe(422)
    expect(credentials.body).toHaveProperty("errors.email", [
      "email is required",
      "email is valid",
    ])
    expect(credentials.body).toHaveProperty("errors.password", [
      "password is required",
    ])
  })
})
