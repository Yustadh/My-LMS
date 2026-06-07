import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  const user = raw ? JSON.parse(raw) : null

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="page-shell dashboard-shell">
      <div className="auth-card">
        <h2>Dashboard</h2>
        {user ? (
          <>
            <p>Welcome, {user.name || user.email}!</p>
            <p>Email: {user.email}</p>
            <p>
              Quiz attempts used: {user.attemptCount ?? 0} / {user.maxAttempts ?? 3}
            </p>
            <div className="button-row">
              <button className="button button-primary" onClick={() => navigate('/ready')}>
                Start Quiz
              </button>
              <button className="button button-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>No user info available.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
