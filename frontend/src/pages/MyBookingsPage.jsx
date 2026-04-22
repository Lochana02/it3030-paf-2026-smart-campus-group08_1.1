import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { bookingService } from '../services/bookingService'

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const response = await bookingService.getUserBookings()
      setBookings(response.bookings || [])
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.cancelBooking(id)
        fetchBookings()
      } catch (error) {
        alert('Failed to cancel: ' + error.message)
      }
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading your bookings...</div>
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#1a1a2e' }}>My Bookings</h1>
        <p style={{ color: '#6c757d' }}>View and manage all your resource bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>You haven't made any bookings yet.</p>
          <Link to="/create-booking" style={{ padding: '10px 24px', backgroundColor: '#0d6efd', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>
            Create Your First Booking
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookings.map((booking) => (
            <div key={booking.id} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              borderLeft: booking.status === 'PENDING' ? '4px solid #ffc107' : 
                         booking.status === 'APPROVED' ? '4px solid #28a745' : 
                         booking.status === 'REJECTED' ? '4px solid #dc3545' : '4px solid #6c757d'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: 2 }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '600' }}>{booking.resourceName}</h3>
                  <p style={{ margin: '0 0 4px', color: '#6c757d', fontSize: '14px' }}>📅 {booking.date}</p>
                  <p style={{ margin: '0 0 4px', color: '#6c757d', fontSize: '14px' }}>⏰ {booking.startTime} — {booking.endTime}</p>
                  <p style={{ margin: '0 0 4px', color: '#6c757d', fontSize: '14px' }}>🎯 {booking.purpose}</p>
                  <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>👥 {booking.attendees} attendees</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: 
                      booking.status === 'PENDING' ? '#fff3cd' :
                      booking.status === 'APPROVED' ? '#d1e7dd' :
                      booking.status === 'REJECTED' ? '#f8d7da' : '#e9ecef',
                    color: 
                      booking.status === 'PENDING' ? '#856404' :
                      booking.status === 'APPROVED' ? '#0f5132' :
                      booking.status === 'REJECTED' ? '#842029' : '#6c757d'
                  }}>
                    {booking.status === 'PENDING' && '⏳ '}
                    {booking.status === 'APPROVED' && '✅ '}
                    {booking.status === 'REJECTED' && '❌ '}
                    {booking.status === 'CANCELLED' && '🚫 '}
                    {booking.status}
                  </span>
                  
                  {booking.status !== 'CANCELLED' && booking.status !== 'REJECTED' && (
                    <div style={{ marginTop: '15px' }}>
                      <button
                        onClick={() => handleCancel(booking.id)}
                        style={{
                          padding: '8px 20px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '13px'
                        }}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookingsPage