import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.PGUSER || 'postgres'}:${process.env.PGPASSWORD || 'postgres'}@${process.env.PGHOST || 'localhost'}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE || 'quizdb'}`

export const pool = new Pool({
  connectionString,
})
const sampleQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Rome', 'Berlin'],
    answer: 'Paris',
  },
  {
    question: 'What is the capital of Germany?',
    options: ['Amsterdam', 'Berlin', 'Madrid', 'Vienna'],
    answer: 'Berlin',
  },
  {
    question: 'What is the capital of Spain?',
    options: ['Lisbon', 'Paris', 'Madrid', 'Rome'],
    answer: 'Madrid',
  },
  {
    question: 'Which language is used for backend development?',
    options: ['HTML', 'CSS', 'JavaScript', 'Photoshop'],
    answer: 'JavaScript',
  },
  {
    question: 'Which company developed React?',
    options: ['Google', 'Amazon', 'Facebook', 'Microsoft'],
    answer: 'Facebook',
  },
]

export const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      password_hash TEXT NOT NULL,
      attempt_count INT NOT NULL DEFAULT 0,
      max_attempts INT NOT NULL DEFAULT 3,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      options JSONB NOT NULL,
      answer TEXT NOT NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      score INT NOT NULL,
      total INT NOT NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
    )
  `)

  const existingQuestions = await pool.query('SELECT id FROM questions LIMIT 1')
  if (existingQuestions.rowCount === 0) {
    for (const question of sampleQuestions) {
      await pool.query(
        'INSERT INTO questions (question, options, answer) VALUES ($1, $2, $3)',
        [question.question, JSON.stringify(question.options), question.answer],
      )
    }
    console.log('Seeded sample questions into Postgres.')
  }
}
