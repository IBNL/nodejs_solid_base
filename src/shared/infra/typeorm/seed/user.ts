import { v4 as uuidV4 } from "uuid"
import { hash } from "bcrypt"
import { createConnection } from "../index"
import { User } from "@modules/user/infra/typeorm/entities/User"

async function create() {
  const id = uuidV4()
  const password = await hash("admin", 8)

  const connection = await createConnection()

  connection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        id: id,
        name: "igor",
        email: "igorn59@gmail.com",
        password: password,
      },
    ])
    .execute()
}

create().then(() => console.log("User created!"))
