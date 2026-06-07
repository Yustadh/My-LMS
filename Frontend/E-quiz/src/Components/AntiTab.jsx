import React, { useEffect, useRef, useState } from 'react'

const AntiTab = ({ onTriggerSubmit, submitted = false }) => {
  const attempts = useRef(0)
  const [attemptCount, setAttemptCount] = useState(0)
  const [warned, setWarned] = useState(false)

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        attempts.current += 1
        setAttemptCount(attempts.current)
        if (attempts.current === 1) {
          window.alert('Warning: Do not navigate away from this tab. A second attempt will trigger an automatic submission')
          setWarned(true)
        } else if (attempts.current >= 2) {
          if (typeof onTriggerSubmit === 'function') onTriggerSubmit()
        }
      }
    }

    const handleBeforeUnload = (e) => {
      attempts.current += 1
      setAttemptCount(attempts.current)
      if (attempts.current === 1) {
        // Show native prompt where supported
        const msg = 'Warning: Do not navigate away from this tab. A second attempt will trigger an automatic submission'
        e.preventDefault()
        e.returnValue = msg
        setWarned(true)
        return msg
      } else if (attempts.current >= 2) {
        if (typeof onTriggerSubmit === 'function') onTriggerSubmit()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [onTriggerSubmit])

  useEffect(() => {
    if (submitted) {
      attempts.current = 0
      setAttemptCount(0)
      setWarned(false)
    }
  }, [submitted])

  return (
    <div className="warning-block">
      {warned && <small>Warning shown: do not navigate away — another attempt will submit.</small>}
      {attemptCount > 0 && (
        <div className={attemptCount >= 2 ? 'warning-status' : 'warning-info'}>
          Tab-leave attempts: {attemptCount}
        </div>
      )}
    </div>
  )
}

export default AntiTab