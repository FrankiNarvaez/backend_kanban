import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { authModel } from '../models/auth.model'
import { validateLogin, validateRegister } from '../schemas/auth.schema'
import { ResponseValidate, ResponseVal } from '../types'

const login = (req: Request, res: any): any => {
  try {
    if (req.body === null) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    const responseValidated: ResponseVal = validateLogin(req.body)

    const { success, data } = responseValidated

    if (!success) {
      return res.status(400).json({ error: '  Invalid data' })
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