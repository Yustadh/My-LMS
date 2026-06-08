import { pool } from '../db.js'

const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5)
}

export const startQuiz = async (req, res) => {
  const userId = req.user?.userId
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const userResult = await pool.query('SELECT attempt_count, max_attempts FROM users WHERE id = $1', [userId])
  const user = userResult.rows[0]

  if (!user) return res.status(404).json({ error: 'User not found' })
  if (user.attempt_count >= user.max_attempts) {
    return res.status(403).json({ error: 'You have reached your allowed quiz attempts' })
  }

  const updated = await pool.query(
    'UPDATE users SET attempt_count = attempt_count + 1 WHERE id = $1 RETURNING attempt_count, max_attempts',
    [userId],
  )

  return res.json({
    message: 'Quiz session started',
    attemptCount: updated.rows[0].attempt_count,
    maxAttempts: updated.rows[0].max_attempts,
    remainingAttempts: updated.rows[0].max_attempts - updated.rows[0].attempt_count,
  })
}

export const getQuestions = async (req, res) => {
  const questionsResult = await pool.query(
    'SELECT id, question, options, answer FROM questions ORDER BY RANDOM() LIMIT 20',
  )

  const questions = questionsResult.rows.map((q) => ({
    id: q.id,
    question: q.question,
    answer: q.answer,
    options: shuffle(q.options),
  }))

  return res.json({ questions })
}

export const submitQuiz = async (req, res) => {
  const userId = req.user?.userId
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const { answers } = req.body
  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Quiz answers are required' })
  }

  const questionIds = Object.keys(answers).map((id) => Number(id))
  const questionsResult = await pool.query(
    'SELECT id, answer FROM questions WHERE id = ANY($1)',
    [questionIds],
  )

  const score = questionsResult.rows.reduce((currentScore, question) => {
    const selected = answers[question.id]
    return selected === question.answer ? currentScore + 1 : currentScore
  }, 0)

  const total = questionIds.length

  await pool.query(
    'INSERT INTO quiz_results (user_id, score, total) VALUES ($1, $2, $3)',
    [userId, score, total],
  )

  return res.json({ score, total })
}

export const getQuizHistory = async (req, res) => {
  const userId = req.user?.userId
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const results = await pool.query(
    'SELECT score, total, created_at FROM quiz_results WHERE user_id = $1 ORDER BY created_at DESC',
    [userId],
  )

  return res.json({ results: results.rows })
}
