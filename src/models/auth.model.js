import { pool } from '../database/connection.database.js'

// Create a user in the database, on the users table
const createUser = async ({ username, email, password }) => {
  const { rows } = await pool.query('INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING user_id, user_name, email, password', [username, email, password])
  pool.query('INSERT INTO section (user_id, section_name) VALUES ($1, $2) RETURNING *', [rows[0].user_id, 'To Do'])
  return rows[0]
}

// Find a user by email in the database, on the users table
const findOneByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  return rows[0]
}

export const authModel = {
  createUser,
  findOneByEmail
}
