import z from 'zod'
// import { ResponseValidate } from '../types'

const loginSchema = z.object({
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email field is required'
  }).email({
    // invalid_type_error: 'Email must be a valid email address'
  }).max(40),
  password: z.string({
    invalid_type_error: 'Password must be a string',
    required_error: 'Password field is required'
  }).max(255)
})

const registerSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username field is required'
  }).max(30),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email field is required'
  }).email({
    // invalid_type_error: 'Email must be a valid email address'
  }).max(40),
  password: z.string({
    invalid_type_error: 'Password must be a string',
    required_error: 'Password field is required'
  }).max(255)
})

export function validateRegister (body: object): object {
  return registerSchema.safeParse(body)
}

export function validateLogin (body: object): object {
  return loginSchema.safeParse(body)
}
