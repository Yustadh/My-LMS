import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  const user = raw ? JSON.parse(raw) : null
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="app-nav">
      <div className="nav-links">
        <Link to="/">Home</Link>
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && <Link to="/dashboard">Dashboard</Link>}
      </div>
      <div className="nav-actions">
        {user ? (
          <>
            <span>{user.name || user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : null}
      </div>
    </nav>
  )
}

export default Nav
