import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const ReadyPrompt = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleBegin = async () => {
    try {
      await api.post('/start')
      sessionStorage.setItem('quizReady', 'true')
      navigate('/quiz')
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to start the quiz')
    }
  }

  const handleReturn = () => {
    sessionStorage.removeItem('quizReady')
    navigate('/')
  }

  return (
    <div className="page-shell">
      <div className="auth-card">
        <h1>Are you ready for the quiz?</h1>
        <p>Please select <strong>Begin</strong> when you are ready.</p>
        {error && <div className="error-box">{error}</div>}
        <div className="button-row">
          <button className="button button-primary" onClick={handleBegin}>Begin</button>
          <button className="button button-secondary" onClick={handleReturn}>Return</button>
        </div>
      </div>
    </div>
  )
}

export default ReadyPrompt
