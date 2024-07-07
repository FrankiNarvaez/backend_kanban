import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(403).json({
      message: 'Token is required'
    })
  }

  token = token.split(' ')[1]

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET)

    console.log(email)
    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Invalid token'
    })
  }
}
