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
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
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
      email: newUser.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '5h'
    })

    return res.cookie('access-token', token, { httpOnly: true, sameSite: 'strict' }).send({ user_id: newUser.user_id, token })
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
    const user = await authModel.findOneByEmail(req.email)
    return res.json({
      ok: true,
      message: user.user_name
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
