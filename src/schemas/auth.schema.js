import { z } from 'zod'

const infoSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username field is required'
  }).max(30),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email field is required'
  }).email({
    invalid_type_error: 'Email must be a valid email address'
  }).max(40),
  password: z.string({
    invalid_type_error: 'Password must be a string',
    required_error: 'Password field is required'
  }).max(255)
})

export function validateRegister (body) {
  return infoSchema.safeParse(body)
}

export function validateLogin (body) {
  return infoSchema.partial().safeParse(body)
}
