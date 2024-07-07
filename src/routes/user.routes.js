import { Router } from 'express'
import { pool } from '../database/connection.database.js'
import { userController } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/jwt.middleware.js'

const router = Router()

router.post('/login', userController.login)

router.post('/register', userController.register)

router.get('/kanban', verifyToken, userController.kanban)

router.get('/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users')
  res.json(rows)
})

router.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1;', [id])
  res.json(rows)
})

router.get('/users/:id/sections', async (req, res) => {
  const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM section WHERE user_id = $1;', [id])
  res.json(rows)
})

router.get('/users/:id/sections/:sectionId', async (req, res) => {
  const { id, sectionId } = req.params
  const { rows } = await pool.query('SELECT * FROM section WHERE user_id = $1 AND section_id = $2;', [id, sectionId])
  res.json(rows)
})

router.get('/users/:id/sections/:sectionId/tasks', async (req, res) => {
  const { sectionId } = req.params
  const { rows } = await pool.query('SELECT * FROM task WHERE section_id = $1;', [sectionId])
  res.json(rows)
})

router.get('/users/:id/sections/:sectionId/tasks/:taskId', async (req, res) => {
  const { sectionId, taskId } = req.params
  const { rows } = await pool.query('SELECT * FROM tasks WHERE section_id = $1 AND task_id = $2;', [sectionId, taskId])
  res.json(rows)
})

router.post('/users', async (req, res) => {
  const { userName } = req.body
  const { rows } = await pool.query('INSERT INTO users (user_name) VALUES ($1) RETURNING *', [userName])
  res.json(rows)
})

export default router
