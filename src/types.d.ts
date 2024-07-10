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

export interface Section {
  section_id?: number
  section_name: string
  user_id: number
}

export interface Task {
  task_id: number
  task_name: string
  section_id: number
}

interface AccessToken {
  access_token: string
}

export interface ObjAccessToken {
  access_token: string
}
