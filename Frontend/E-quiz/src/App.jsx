import './App.css'
import { useState } from 'react'
import DisplayQ from './DisplayQ'
import Questions from './Questions'
import Time from './Components/Time'
import CountDown from './Components/CountDown'
import Submit from './Components/Submit'
import AntiCopy from './Components/AntiCopy'
import AntiTab from './Components/AntiTab'


function App() {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState(() => {
    const copy = [...Questions]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  })

  const submitQuiz = () => {
    if (submitted) return
    const totalScore = questions.reduce((sum, question) => {
      const answer = answers[question.id]
      return answer === question.answer ? sum + 1 : sum
    }, 0)
    setScore(totalScore)
    setSubmitted(true)
  }

  return (
    <>
      <Time />
      <CountDown hours={0} minutes={0} seconds={30} onComplete={submitQuiz} active={!submitted} />
      <h1>Welcome to E-Quiz</h1>
      <AntiCopy onTriggerSubmit={submitQuiz} submitted={submitted} />
      <AntiTab onTriggerSubmit={submitQuiz} submitted={submitted} />
      <DisplayQ questions={questions} answers={answers} setAnswers={setAnswers} />
      <Submit questions={questions} answers={answers} submitted={submitted} score={score} onSubmit={submitQuiz} />
    </>
  )
}

export default App
