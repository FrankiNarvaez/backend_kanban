import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const secretJWT: string = process.env.JWT_SECRET as string

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const token: string = req.cookies.access_token

  if (token === undefined) {
    return res.status(403).json({
      message: 'Token is required'
    })
  }

  try {
    const { user_id: userId } = jwt.verify(token, secretJWT) as jwt.JwtPayload
    (req as any).user_id = userId

    next()
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid token'
    })
  }
}
