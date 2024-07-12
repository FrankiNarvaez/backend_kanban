import { Request } from 'express'

export const headerCookie = res.header('Access-Control-Allow-Origin', '*')

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

/* export interface RequestWithUserId extends Request {
  user_id: number
} */

interface AddUserId {
  user_id: number
}

export type RequestWithUserId = Request & AddUserId
