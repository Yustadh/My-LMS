import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import loginRoute from './Routes/Quiz/loginRoute.js'
import registerRoute from './Routes/Quiz/registerRoute.js'
import quizRoute from './Routes/Quiz/quizRoute.js'
import { initDb } from './db.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Quiz backend running')
})

app.use('/api/quiz', loginRoute)
app.use('/api/quiz', registerRoute)
app.use('/api/quiz', quizRoute)

await initDb()

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})