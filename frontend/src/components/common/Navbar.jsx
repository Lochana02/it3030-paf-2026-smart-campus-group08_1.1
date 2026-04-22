import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Demo user for testing (remove this in production)
  const demoUser = { name: 'Test User', role: 'ADMIN' }
  const isAuth = true // Force authenticated for testing
  const isAdminUser = true // Force admin for testing

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>🏫 Smart Campus</Link>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/my-bookings" style={{ color: 'white', textDecoration: 'none' }}>My Bookings</Link>
        <Link to="/create-booking" style={{ color: 'white', textDecoration: 'none' }}>Create Booking</Link>
        {isAdminUser && <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin Panel</Link>}
        <span style={{ marginLeft: '10px' }}>👤 {demoUser.name}</span>
        <button 
          onClick={handleLogout}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '5px 15px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar