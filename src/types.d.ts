interface ContentSchemaResponse {
  username?: string
  email: string
  password: string
}

export interface ResponseValidate {
  success: boolean
  data?: ContentSchemaResponse
}
