import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await api.post('/login', { email, password })
      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/ready')
        return
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="page-shell auth-shell">
      <div className="auth-card">
        <h2>Login</h2>
        <p>Enter your credentials to continue.</p>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button button-primary" type="submit">
            Login
          </button>
        </form>
        <p className="form-note">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  )
}

export default Login