import { Repository } from "typeorm"

import { IUsersRepository } from "@modules/user/repositories/IUsersRepository"
import dataSource from "@shared/infra/typeorm"
import { User } from "@modules/user/infra/typeorm/entities/User"
import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO"

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User)
  }

  async create({ email, name, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      email,
      name,
      password,
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email })
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id })
    return user
  }
}

export { UsersRepository }
