interface Response {
  username?: string
  email: string
  password: string
}

type ResponseVal = boolean | Response

export interface ResponseValidate {
  success: boolean
  data?: Response
}
