import { pool } from '../database/connection.database'
import { User, Object } from '../types'

// Crear un nuevo usuario en la tabla de usuarios
const createUser = async (infoUser: { username: string, email: string, password: string }): Promise<object> => {
  const { username, email, password } = infoUser
  const { rows }: Object<User> = await pool.query('INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING user_id, user_name, email, password', [username, email, password])
  await pool.query('INSERT INTO section (user_id, section_name) VALUES ($1, $2) RETURNING *', [rows[0].user_id, 'To Do'])

  return rows[0]
}

// Encontrar un usuario por email
const findUserByEmail = async (email: string): Promise<object> => {
  const { rows }: Object<User> = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  return rows[0]
}

// Encontrar un usuario por id
const findUserById = async (id: number): Promise<object> => {
  const { rows }: Object<User> = await pool.query('SELECT * FROM users WHERE user_id = $1', [id])

  return rows[0]
}

export const authModel = {
  createUser,
  findUserByEmail,
  findUserById
}
