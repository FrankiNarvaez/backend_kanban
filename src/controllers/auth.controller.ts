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

    const token = jwt.sign({ user_id: user.user_id }, secretJWT, { expiresIn: '1h' })

    return res.cookie('access_token', token, { httpOnly: true, sameSite: 'strict' }).send({ message: 'Logged in' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
const register = () => null

const logout = async (_: Request, res: Response): Promise<Response> => {
  try {
    return res.clearCookie('access_token').json({ message: 'Logout successful' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}

const kanban = () => null

export const AuthController = {
  login,
  register,
  logout,
  kanban
}