import express from 'express'
import userRouter from './routes/auth.routes.js'
import dbRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import path from 'path'

import { PORT } from './config.js'

import 'dotenv/config'

const __dirname = path.resolve('public')

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())
app.use(express.json())

app.use(express.static(__dirname))

app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'documentation.public.html'))
})

app.use(userRouter)
app.use(dbRouter)

app.listen(PORT, () => {
  console.clear()
  console.log(`Server is running on port ${PORT}`)
})
