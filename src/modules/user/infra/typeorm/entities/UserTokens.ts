import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { v4 as uuidV4 } from "uuid"

import { User } from "./User"

@Entity("users_tokens")
class UserTokens {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  @Column()
  user_id: string

  @Column("inet")
  ip_address: string

  @Column()
  access_token: string

  @Column()
  expires_date: Date

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { UserTokens }
