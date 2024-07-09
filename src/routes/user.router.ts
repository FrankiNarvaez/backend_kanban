import { Router } from 'express'

const router = Router()

router.get('/user', (_req, res) => {
  res.send('User route')
})

export default router