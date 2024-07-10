interface ContentSchemaResponse {
  username?: string
  email: string
  password: string
}

export interface ResponseValidate {
  success: boolean
  data?: ContentSchemaResponse
}

export interface Object<T> {
  rows: T[]
}

export interface User {
  user_id: number
  user_name: string
  email: string
  password: string
}

export interface access_token {
  access_token: string
}
