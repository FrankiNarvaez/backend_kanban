import { Router } from 'express'
import { userController } from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/jwt.middleware.js'

const router = Router()

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/logout', userController.logout)

// Route protected by JWT
router.get('/kanban', verifyToken, userController.kanban)

export default router
