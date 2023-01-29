class ICreateUserTokenDTO {
  user_id: string
  expires_date: Date
  access_token: string
  ip_address
}

export { ICreateUserTokenDTO }
