import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(403).json({
      message: 'Token is required'
    })
  }

  try {
    const { user_id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user_id = user_id

    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Invalid token'
    })
  }
}
