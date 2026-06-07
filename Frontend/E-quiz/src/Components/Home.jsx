import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  return (
    <div className="page-shell landing-shell">
      <section className="hero-card hero-animated">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-glow hero-glow-3" />
        <div>
          <p className="eyebrow">Quiz Time</p>
          <h1>Challenge your knowledge with a secure quiz experience</h1>
          <p className="hero-copy">
            Sign up or login to begin your quiz journey. Your account is protected, your progress is tracked,
            and every question is randomized for a fair challenge.
          </p>
          <div className="button-row hero-buttons">
            {token ? (
              <Link className="button button-primary hero-button" to="/dashboard">
                Dashboard
              </Link>
            ) : (
              <>
                <Link className="button button-primary hero-button" to="/login">
                  Login
                </Link>
                <Link className="button button-secondary hero-button" to="/register">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home