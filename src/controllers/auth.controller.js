import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { authModel } from '../models/auth.model.js'
import { validateLogin, validateRegister } from '../schemas/auth.schema.js'

const login = async (req, res) => {
  try {
    const { success, data } = validateLogin(req.body)

    if (!success) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid data'
      })
    }

    const user = await authModel.findOneByEmail(data.email)
    console.log(user)

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      })
    }

    const isMatchPassword = bcrypt.compareSync(data.password, user.password)

    if (!isMatchPassword) {
      return res.status(400).json({
        message: 'Invalid password'
      })
    }

    const token = jwt.sign({
      user_id: user.user_id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '5h'
    })

    res.cookie('access_token', token, { httpOnly: true, sameSite: 'strict' }).send({ user_id: user.user_id, token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}

const register = async (req, res) => {
  try {
    const { success, data } = validateRegister(req.body)

    if (!success) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid data'
      })
    }

    const { username, email, password } = data

    const user = await authModel.findOneByEmail(email)
    if (user) {
      return res.status(400).json({
        ok: false,
        message: 'Email already exists'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = await authModel.createUser({ username, email, password: hashedPassword })

    const token = jwt.sign({
      user_id: newUser.user_id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '5h'
    })

    return res.status(200).json({
      ok: true,
      message: token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}

const logout = async (req, res) => {
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

const kanban = async (req, res) => {
  try {
    const { cookies } = req

    if (!cookies.access_token) {
      return res.status(401).json({
        ok: false,
        message: 'Unauthorized'
      })
    }

    const user = await authModel.findOneById(req.user_id)
    return res.json({
      ok: true,
      message: user.user_id
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Internal server error'
    })
  }
}

export const userController = {
  login,
  register,
  logout,
  kanban
}
