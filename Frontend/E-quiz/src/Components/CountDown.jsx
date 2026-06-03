import React, { useEffect, useState } from 'react'

const CountDown = ({ hours = 0, minutes = 0, seconds = 0, onComplete, active = true }) => {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds)

  useEffect(() => {
    setRemainingSeconds(totalSeconds)
  }, [totalSeconds])

  useEffect(() => {
    if (!active) return

    if (totalSeconds <= 0) {
      setRemainingSeconds(0)
      if (onComplete) onComplete()
      return
    }

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId)
          if (onComplete) onComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [totalSeconds, onComplete, active])

  const displayHours = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0')
  const displayMinutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0')
  const displaySeconds = String(remainingSeconds % 60).padStart(2, '0')

  return (
    <div>
      <strong>Countdown:</strong> {displayHours} hrs {displayMinutes} mins {displaySeconds} secs
    </div>
  )
}

export default CountDown