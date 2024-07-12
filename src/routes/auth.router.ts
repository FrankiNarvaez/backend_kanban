import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { verifyToken } from '../middlewares/jwt.middleware'
import { headerCookie } from '../types'

const router = Router()

router.post('/register', AuthController.register as any, headerCookie)
router.post('/login', AuthController.login as any, headerCookie)
router.post('/logout', AuthController.logout, headerCookie)

router.get('/kanban', verifyToken, AuthController.kanban as any, headerCookie)

export default router
