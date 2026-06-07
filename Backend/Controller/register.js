import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { pool } from '../db.js'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' })

    const normalizedEmail = email.toLowerCase().trim()
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [normalizedEmail])
    if (existing.rowCount > 0) return res.status(409).json({ error: 'User already exists' })

    const passwordHash = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name, attempt_count, max_attempts',
      [normalizedEmail, name || '', passwordHash],
    )

    const user = result.rows[0]
    const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: '8h',
    })

    return res.status(201).json({
      message: 'Registration successful',
      user,
      token,
    })
  } catch (err) {
    console.error('Register error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export { register };