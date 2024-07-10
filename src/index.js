import express from 'express'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
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
  console.log('into here /documentation')
  res.sendFile(path.join(__dirname, 'documentation.public.html'))
})

app.use(authRouter)
app.use('/api/', userRouter)

app.use('/s', (req, res) => {
  console.log('into here /')
  res.send('<h1>Welcome. add "/documentation" to the URL for watch the documentation</h1>')
})

app.listen(PORT, () => {
  console.clear()
  console.log(`Server is running on port ${PORT}`)
})
