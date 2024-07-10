import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { verifyToken } from '../middlewares/jwt.middleware'

const router = Router()

router.post('/register', AuthController.register as any)
router.post('/login', AuthController.login as any)
router.post('/logout', AuthController.logout)

router.get('/kanban', verifyToken, AuthController.kanban as any)

export default router
