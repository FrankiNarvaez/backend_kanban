import { pool } from '../database/connection.database.js'

// Get all users from the database
const getUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM users')
  return rows
}

// Get a user from the database
const getUser = async (userId) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId])
  return rows[0]
}

// Get a user's sections from the database
const getSections = async (userId) => {
  const { rows } = await pool.query(`SELECT section.section_id, section.section_name, users.user_name
    FROM section
    JOIN users ON section.user_id = users.user_id
    WHERE users.user_id = $1`, [userId])
  return rows
}

// Get a user's section from the database
const getSection = async (sectionId) => {
  const { rows } = await pool.query('SELECT * FROM section WHERE section_id = $1', [sectionId])
  return rows[0]
}

// Get a user's section's tasks from the database
const getTasks = async (userId, sectionId) => {
  const { rows } = await pool.query(`SELECT tasks.task_id, tasks.description, section.section_name 
    FROM tasks 
    JOIN section ON tasks.section_id = section.section_id
    JOIN users ON section.user_id = users.user_id
    WHERE section.section_id = $1 AND users.user_id = $2;`, [sectionId, userId])
  return rows
}

// Get a user's section's task from the database
const getTask = async (taskId) => {
  const { rows } = await pool.query('SELECT * FROM tasks WHERE task_id = $1', [taskId])
  return rows[0]
}

// Create a section in the database, on the sections table that is related to a user
const createSection = async ({ userId, sectionName }) => {
  const { rows } = await pool.query('INSERT INTO section (user_id, section_name) VALUES ($1, $2) RETURNING *', [userId, sectionName])
  return rows[0]
}

// Create a task in the database, on the tasks table that is related to a section
const createTask = async ({ sectionId, taskName }) => {
  const { rows } = await pool.query('INSERT INTO task (section_id, task_name) VALUES ($1, $2) RETURNING *', [sectionId, taskName])
  return rows[0]
}

// Delete a section from the database
const deleteSection = async (sectionId) => {
  await pool.query('DELETE FROM section WHERE section_id = $1', [sectionId])
}

// Delete a task from the database
const deleteTask = async (taskId) => {
  await pool.query('DELETE FROM task WHERE task_id = $1', [taskId])
}

// Update section_name in the database
const updateNameSection = async (sectionId, sectionName) => {
  await pool.query('UPDATE section SET section_name = $1 WHERE section_id = $2', [sectionName, sectionId])
}

// Update task_name in the database
const updateNameTask = async (taskId, taskName) => {
  await pool.query('UPDATE task SET task_name = $1 WHERE task_id = $2', [taskName, taskId])
}

// Update section_id of the task in the database
const updateSectionIdTask = async (taskId, sectionId) => {
  await pool.query('UPDATE task SET section_id = $1 WHERE task_id = $2', [sectionId, taskId])
}

export const dbModel = {
  getUsers,
  getUser,
  getSections,
  getSection,
  getTasks,
  getTask,
  createSection,
  createTask,
  deleteSection,
  deleteTask,
  updateNameSection,
  updateNameTask,
  updateSectionIdTask
}
