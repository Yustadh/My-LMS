import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import Time from '../Components/Time'
import CountDown from '../Components/CountDown'
import DisplayQ from '../DisplayQ'
import Submit from '../Components/Submit'
import AntiCopy from '../Components/AntiCopy'
import AntiTab from '../Components/AntiTab'

const QuizPage = () => {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const ready = sessionStorage.getItem('quizReady')
    if (!token) {
      navigate('/login')
      return
    }
    if (!ready) {
      navigate('/ready')
      return
    }

    const fetchQuestions = async () => {
      try {
        const response = await api.get('/questions')
        setQuestions(response.data.questions)
      } catch (err) {
        const message = err.response?.data?.error || 'Unable to fetch quiz questions.'
        setError(message)
        if (err.response?.status === 403) {
          setTimeout(() => navigate('/dashboard'), 2500)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [navigate])

  useEffect(() => {
    if (submitted) {
      sessionStorage.removeItem('quizReady')
    }
  }, [submitted])

  const handleSubmit = async () => {
    if (submitted) return
    try {
      const response = await api.post('/submit', { answers })
      setScore(response.data.score)
      setSubmitted(true)
      window.alert(`Your answers have been submitted. Score: ${response.data.score}/${response.data.total}`)
    } catch (err) {
      window.alert(err.response?.data?.error || 'Submission failed.')
    }
  }

  if (loading) {
    return (
      <div className="page-shell">
        <div className="auth-card">
          <h2>Loading quiz...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-shell">
        <div className="auth-card">
          <h2>Unable to load quiz</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell quiz-shell">
      <div className="quiz-header">
        <Time />
        <CountDown hours={0} minutes={5} seconds={0} onComplete={handleSubmit} active={!submitted} />
      </div>

      <div className="quiz-panel">
        <div className="quiz-card">
          <DisplayQ questions={questions} answers={answers} setAnswers={setAnswers} />
          <Submit questions={questions} answers={answers} submitted={submitted} score={score} onSubmit={handleSubmit} />
        </div>

        <div className="quiz-sidebar">
          <AntiCopy onTriggerSubmit={handleSubmit} submitted={submitted} />
          <AntiTab onTriggerSubmit={handleSubmit} submitted={submitted} />
        </div>
      </div>
    </div>
  )
}

export default QuizPage
