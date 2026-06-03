import React, { useState } from 'react'

const Time = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString())
    

    const updateTime = () => {
        const currentTime = new Date().toLocaleTimeString()
        setTime(currentTime)
    }
    setInterval(updateTime, 1000)
  return (
    <div>
        {time}
    </div>
  )
}

export default Time