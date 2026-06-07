import React, { useState } from 'react'
const DisplayQ = ({ questions, answers: propAnswers, setAnswers: propSetAnswers }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [localAnswers, setLocalAnswers] = useState({})
    const answers = propAnswers !== undefined ? propAnswers : localAnswers
    const setAnswers = propSetAnswers !== undefined ? propSetAnswers : setLocalAnswers

    if (!questions || questions.length === 0) return <div>No questions available</div>

    const total = questions.length
    const current = questions[currentIndex]

    const handleOptionChange = (event) => {
        const value = event.target.value
        setAnswers((prev) => ({ ...prev, [current.id]: value }))
    }

    const goNext = () => setCurrentIndex((i) => Math.min(total - 1, i + 1))
    const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1))

    const answeredCount = Object.values(answers).filter((v) => v).length
    const remainingCount = total - answeredCount

    return (
        <div className="question-block">
            <div className="question-meta">
                <div>
                    <strong>Question {currentIndex + 1} of {total}</strong>
                </div>
                <div className="button-row">
                    <button className="page-button" onClick={goPrev} disabled={currentIndex === 0} aria-label="Previous question">
                        ◀ Previous
                    </button>
                    <button className="page-button" onClick={goNext} disabled={currentIndex === total - 1} aria-label="Next question">
                        Next ▶
                    </button>
                </div>
            </div>

            <div>
                <h3>{current.question}</h3>
                <div className="option-list">
                    {current.options.map((option, index) => (
                        <label key={index} className="option-item">
                            <input
                                type="radio"
                                name={`answer-${current.id}`}
                                value={option}
                                checked={answers[current.id] === option}
                                onChange={handleOptionChange}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="question-summary">
                <span><strong>Answered:</strong> {answeredCount}</span>
                <span><strong>Remaining:</strong> {remainingCount}</span>
            </div>
        </div>
    )
}

export default DisplayQ