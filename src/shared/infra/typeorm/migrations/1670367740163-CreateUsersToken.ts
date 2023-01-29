import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersToken1670367740163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_tokens",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "user_id", type: "uuid" },
          { name: "ip_address", type: "inet" },
          { name: "access_token", type: "varchar" },
          { name: "expires_date", type: "timestamp" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "deleted_at", type: "timestamp", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "FKUserToken",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_tokens")
  }
}
