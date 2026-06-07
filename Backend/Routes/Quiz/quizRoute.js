import express from 'express'
import { authMiddleware } from '../../Controllers/authMiddleware.js'
import { startQuiz, getQuestions, submitQuiz, getQuizHistory } from '../../Controllers/quiz.js'

const router = express.Router()

router.post('/start', authMiddleware, startQuiz)
router.get('/questions', authMiddleware, getQuestions)
router.post('/submit', authMiddleware, submitQuiz)
router.get('/history', authMiddleware, getQuizHistory)

export default router
