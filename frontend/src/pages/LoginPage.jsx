import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Demo login - In production, call actual API
    if (email && password) {
      const demoUser = {
        id: 'user-123',
        name: 'Test User',
        email: email,
        role: email.includes('admin') ? 'ADMIN' : 'USER'
      }
      const demoToken = 'demo-token-123'
      
      setTimeout(() => {
        login(demoUser, demoToken)
        navigate('/dashboard')
        setLoading(false)
      }, 1000)
    } else {
      setError('Please enter email and password')
      setLoading(false)
    }
  }

  return (
    <div className="login-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh'
    }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1>🏫 Smart Campus</h1>
          <p>Booking System Login</p>
        </div>

        {error && (
          <div className="error" style={{ textAlign: 'center', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          <p>Demo Credentials:</p>
          <p>User: user@example.com / any password</p>
          <p>Admin: admin@example.com / any password</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage