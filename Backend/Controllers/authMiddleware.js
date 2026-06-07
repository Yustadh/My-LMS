import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'

export const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization || ''
  const token = authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
