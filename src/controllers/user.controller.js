import { userModel } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Missing fields'
      })
    }

    const user = await userModel.findOneByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      })
    }

    const isMatchPassword = bcrypt.compareSync(password, user.password)

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
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Missing fields'
      })
    }

    const user = await userModel.findOneByEmail(email)
    if (user) {
      return res.status(400).json({
        ok: false,
        message: 'Email already exists'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = await userModel.createUser({ username, email, password: hashedPassword })

    const token = jwt.sign({
      email: newUser.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    })

    return res.status(201).json({
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

const kanban = async (req, res) => {
  try {
    const user = await userModel.findOneByEmail(req.email)
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
  kanban
}
