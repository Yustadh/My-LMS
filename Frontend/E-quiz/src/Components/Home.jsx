import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div>
        <h1>Hello {location.state?.name || 'Guest'} Welcome to the Home Page </h1>

    </div>
  )
}

export default Home