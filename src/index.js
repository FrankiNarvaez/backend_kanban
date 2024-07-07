import express from 'express'
import { PORT } from './config.js'
import userRouter from './routes/user.routes.js'
import 'dotenv/config'

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.use(userRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.listen(PORT, () => {
  console.clear()
  console.log(`Server is running on port ${PORT}`)
})
