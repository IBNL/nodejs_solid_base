interface ITokenProvider {
  create(user_id: string): string
}

export type { ITokenProvider }
