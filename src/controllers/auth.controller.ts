import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { authModel } from '../models/auth.model'
import { validateLogin, validateRegister } from '../schemas/auth.schema'
import { ResponseValidate } from '../types'
import { Request, Response } from 'express'

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const responseValidated: ResponseValidate = validateLogin(req.body) as ResponseValidate

    const { success, data } = responseValidated

    if (!success || data === undefined) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    const user = await authModel.findUserByEmail(data.email)

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    const isMatchPassword = bcrypt.compareSync(data.password, user.password)

    if (!isMatchPassword) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    return res.cookie('access_token', token, { httpOnly: true, sameSite: 'strict' }).send({ message: 'Logged in' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
const register = () => null
const logout = () => null

const kanban = () => null

export const AuthController = {
  login,
  register,
  logout,
  kanban
}