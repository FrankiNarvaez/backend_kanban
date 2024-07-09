import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
// import { verifyToken } from '../middlewares/jwt.middleware'

const router = Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/ogout', AuthController.logout)

// router.get('/kanban', verifyToken, AuthController.kanban)

export default router
