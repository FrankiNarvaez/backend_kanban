interface Response {
  username?: string
  email: string
  password: string
}

export type ResponseVal = boolean | Reponse | object[]
export interface ResponseValidate {
  success: boolean
  data?: Response
  error?: object[]
}
