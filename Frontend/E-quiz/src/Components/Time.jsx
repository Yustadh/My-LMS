import React, { useEffect, useState } from 'react'

const Time = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <p className="current-time">Current time: {time}</p>
}

export default Time