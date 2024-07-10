import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { authModel } from '../models/auth.model'
import { validateLogin, validateRegister } from '../schemas/auth.schema'
import { ResponseValidate, User } from '../types'
import { Request, Response } from 'express'

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const responseValidated: ResponseValidate = validateLogin(req.body) as ResponseValidate
    const { success, data } = responseValidated
    if (!success || data === undefined) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    const user: User | undefined = await authModel.findUserByEmail(data.email) as User
    if (user === undefined) {
      return res.status(400).json({ error: 'User not found' })
    }

    const isMatchPassword = bcrypt.compareSync(data.password, user.password)

    if (!isMatchPassword) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    const secretJWT: string = process.env.JWT_SECRET as string

    const token = jwt.sign({ user_id: user.user_id }, secretJWT, { expiresIn: '5h' })

    return res.cookie('access_token', token, { httpOnly: true, sameSite: 'strict' }).send({ message: 'Logged in' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const responseValidated: ResponseValidate = validateRegister(req.body) as ResponseValidate
    const { success, data } = responseValidated
    if (!success || data === undefined || data.username === undefined) {
      return res.status(400).json({ ok: false, message: 'Invalid data' })
    }

    const { username, email, password } = data

    const user: User = await authModel.findUserByEmail(data.email) as User
    if (user !== undefined) {
      return res.status(400).json({ ok: false, message: 'Email already exists' })
    }
    const salt: string = bcrypt.genSaltSync(10)

    const hashedPassword: string = bcrypt.hashSync(password, salt)
    const newUser: User = await authModel.createUser({ username, email, password: hashedPassword }) as User
    const secretJWT: string = process.env.JWT_SECRET as string
    const token = jwt.sign({ user_id: newUser.user_id }, secretJWT, { expiresIn: '5h' })
    return res.status(200).json({ ok: true, message: token })
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Internal server error' })
  }
}
const logout = (_: Request, res: Response): Response => {
  try {
    return res.clearCookie('access_token').json({ message: 'Logout successful' })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}

const kanban = async (req: Request, res: Response): Promise<any> => {
  try {
    const token: string = req.cookies.access_token

    if (token === undefined) {
      return res.status(401).json({
        ok: false,
        message: 'Unauthorized'
      })
    }

    const user: User = await authModel.findUserById((req as any).user_id) as User
    return res.json({
      ok: true,
      message: user.user_id
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}

export const AuthController = {
  login,
  register,
  logout,
  kanban
}
