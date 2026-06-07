import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { pool } from '../db.js'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' })

    const normalizedEmail = email.toLowerCase().trim()
    const userResult = await pool.query('SELECT id, email, name, password_hash, attempt_count, max_attempts FROM users WHERE email = $1', [normalizedEmail])
    const user = userResult.rows[0]

    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const passwordMatches = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatches) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: '8h',
    })

    return res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        attemptCount: user.attempt_count,
        maxAttempts: user.max_attempts,
      },
      token,
    })
  } catch (err) {
    console.error('Login error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export { login };