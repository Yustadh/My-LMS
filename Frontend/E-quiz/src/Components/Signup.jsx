import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'



const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    // Handle login logic here
    try {
      const response = await axios.post('/api/quiz/signup', { email, password })
      console.log('Signup successful:', response.data)
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message)
    }
    navigate('/dashboard') // Example navigation after signup
  }

  return (
    <div className="login">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <p>OR</p>
            <br />
                <Link to="/register">Don't have an account? Register here</Link>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Signup