import React, { useEffect, useRef, useState } from 'react'

const AntiCopy = ({ onTriggerSubmit, submitted = false }) => {
  const [warned, setWarned] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const attempts = useRef(0)

  useEffect(() => {
    const handleCopy = (e) => {
      attempts.current += 1
      setAttemptCount(attempts.current)

      if (attempts.current === 1) {
        // First attempt: warn the user
        window.alert('Warning: Do not copy. A second attempt will trigger an automatic submission')
        setWarned(true)
        // Prevent clipboard modification
        e.preventDefault()
      } else if (attempts.current >= 2) {
        // Second attempt: trigger automatic submission
        if (typeof onTriggerSubmit === 'function') onTriggerSubmit()
        // Prevent clipboard modification
        e.preventDefault()
      }
    }

    document.addEventListener('copy', handleCopy)
    return () => document.removeEventListener('copy', handleCopy)
  }, [onTriggerSubmit])

  // Reset attempts when quiz is submitted
  useEffect(() => {
    if (submitted) {
      attempts.current = 0
      setAttemptCount(0)
      setWarned(false)
    }
  }, [submitted])

  return (
    <div className="warning-block">
      <p>This content cannot be copied during the quiz.</p>
      {attemptCount > 0 && (
        <div className={attemptCount >= 2 ? 'warning-status' : 'warning-info'}>
          Copy attempts: {attemptCount}
        </div>
      )}
      {warned && <small>Copying is prohibited — further attempts will submit the quiz.</small>}
    </div>
  )
}

export default AntiCopy