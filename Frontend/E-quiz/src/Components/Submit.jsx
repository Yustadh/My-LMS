import React from 'react'
const Submit = ({ questions, answers = {}, submitted = false, score = 0, onSubmit }) => {
  const total = questions ? questions.length : 0
  const answeredCount = Object.values(answers).filter((v) => v).length
  const allAnswered = answeredCount === total

  return (
    <div className="submit-block">
      <button className="button button-primary" onClick={onSubmit} disabled={submitted || !allAnswered} aria-disabled={submitted || !allAnswered}>
        {submitted ? 'Quiz Submitted' : 'Submit Quiz'}
      </button>

      <div>
        <strong>Answered:</strong> {answeredCount} / {total}
      </div>

      {submitted && (
        <div>
          <strong>Score:</strong> {score} / {total}
        </div>
      )}
    </div>
  )
}

export default Submit
