import { Router } from 'express'
import { userController } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/jwt.middleware.js'

const router = Router()

router.post('/login', userController.login)

router.post('/register', userController.register)

router.get('/kanban', verifyToken, userController.kanban)

export default router
