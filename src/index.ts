import express from 'express'
import authRouter from './routes/auth.router'
import userRouter from './routes/user.router'
import cookieParser from 'cookie-parser'

const PORT = 3000

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())
app.use(express.json())
app.use(express.text())

app.get('/', (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  console.log('Hello my friend')
  res.send('Hello World!')
})

app.use(authRouter)
app.use('/api', userRouter)

app.listen(PORT, () => {
  console.clear()
  console.log(`Server is running on http://localhost:${PORT}`)
})

 //Nicolas 
