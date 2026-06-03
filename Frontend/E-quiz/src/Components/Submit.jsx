import React from 'react'
const Submit = ({ questions, answers = {}, submitted = false, score = 0, onSubmit }) => {
  const total = questions ? questions.length : 0
  const answeredCount = Object.values(answers).filter((v) => v).length
  const allAnswered = answeredCount === total

  return (
    <div style={{ marginTop: '16px' }}>
      <button onClick={onSubmit} disabled={submitted || !allAnswered} aria-disabled={submitted || !allAnswered}>
        {submitted ? 'Quiz Submitted' : 'Submit Quiz'}
      </button>

      <div style={{ marginTop: '8px' }}>
        <strong>Answered:</strong> {answeredCount} / {total}
      </div>

      {submitted && (
        <div style={{ marginTop: '8px' }}>
          <strong>Score:</strong> {score} / {total}
        </div>
      )}
    </div>
  )
}

export default Submit
