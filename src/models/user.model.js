import { pool } from '../database/connection.database.js'

const create = async ({ username, email, password }) => {
  const { rows } = await pool.query('INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING user_name, email, password', [username, email, password])
  return rows[0]
}

const findOneByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  return rows[0]
}

export const userModel = {
  create,
  findOneByEmail
}
