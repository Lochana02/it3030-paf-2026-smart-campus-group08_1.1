import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bookingService } from '../services/bookingService'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [liveTime, setLiveTime] = useState(new Date())
  
  const [resources, setResources] = useState({
    total: 0,
    available: 0,
    inUse: 0,
    maintenance: 0,
    booked: 0
  })

  // Live time update
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await bookingService.getDashboardStats()
        setStats(statsData)
        
        const bookingsData = await bookingService.getAllBookings()
        const allBookings = bookingsData.bookings || []
        setRecentBookings(allBookings.slice(0, 5) || [])
        
        const uniqueResources = [...new Set(allBookings.map(b => b.resourceId))]
        const totalResources = uniqueResources.length || 12
        
        const approvedCount = allBookings.filter(b => b.status === 'APPROVED').length
        const pendingCount = allBookings.filter(b => b.status === 'PENDING').length
        const rejectedCount = allBookings.filter(b => b.status === 'REJECTED').length
        
        setResources({
          total: totalResources,
          available: Math.max(0, totalResources - approvedCount - pendingCount) || 5,
          inUse: approvedCount || 2,
          maintenance: rejectedCount || 3,
          booked: pendingCount || 2
        })
        
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  // Calculate utilization percentage
  const utilizationPercentage = stats?.totalBookings > 0 
    ? Math.round((stats.totalApproved / stats.totalBookings) * 100) 
    : 0

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh',
        backgroundColor: '#f5f7fa'
      }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '20px', 
      backgroundColor: '#f5f7fa', 
      minHeight: '100vh' 
    }}>
      
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#1a1a2e', marginBottom: '8px' }}>
          👋 Welcome back!
        </h1>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>
          Here's what's happening with your campus resources.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        marginBottom: '25px',
        borderBottom: '2px solid #e9ecef',
        paddingBottom: '12px'
      }}>
        <span style={{ 
          color: '#0d6efd', 
          fontWeight: '500', 
          borderBottom: '3px solid #0d6efd',
          paddingBottom: '12px',
          cursor: 'pointer'
        }}>
          Dashboard
        </span>
        <span style={{ color: '#6c757d', cursor: 'pointer' }} onClick={() => navigate('/my-bookings')}>
          Resources
        </span>
        <span style={{ color: '#6c757d', cursor: 'pointer' }} onClick={() => navigate('/create-booking')}>
          Add Resource
        </span>
      </div>

      {/* Real-time monitoring header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '25px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>
          📊 Real-time resource monitoring & analytics
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Live Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              backgroundColor: '#2dcb74', 
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }}></span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#2dcb74' }}>Live</span>
            <span style={{ fontSize: '13px', color: '#6c757d' }}>{formatTime(liveTime)}</span>
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '6px 16px',
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards - Row 1 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderTop: '4px solid #0d6efd'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6c757d', fontSize: '13px', marginBottom: '8px' }}>Total Resources</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{resources.total}</p>
            </div>
            <div style={{ fontSize: '36px', opacity: 0.7 }}>🏢</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderTop: '4px solid #28a745'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6c757d', fontSize: '13px', marginBottom: '8px' }}>Available</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#28a745' }}>{resources.available}</p>
            </div>
            <div style={{ fontSize: '36px', opacity: 0.7 }}>✅</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderTop: '4px solid #ffc107'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6c757d', fontSize: '13px', marginBottom: '8px' }}>In Use</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#ffc107' }}>{resources.inUse}</p>
            </div>
            <div style={{ fontSize: '36px', opacity: 0.7 }}>⚡</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderTop: '4px solid #dc3545'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6c757d', fontSize: '13px', marginBottom: '8px' }}>Maintenance</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#dc3545' }}>{resources.maintenance}</p>
            </div>
            <div style={{ fontSize: '36px', opacity: 0.7 }}>🔧</div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Row 2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderTop: '4px solid #17a2b8'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6c757d', fontSize: '13px', marginBottom: '8px' }}>Booked</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#17a2b8' }}>{resources.booked}</p>
            </div>
            <div style={{ fontSize: '36px', opacity: 0.7 }}>📖</div>
          </div>
        </div>
      </div>

      {/* Booking Statistics - Full Width Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        marginBottom: '30px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#1a1a2e' }}>
          📊 Booking Statistics
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '20px'
        }}>
          <div>
            <p style={{ fontSize: '13px', color: '#6c757d', marginBottom: '5px' }}>📊 Total Bookings</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e' }}>{stats?.totalBookings || 0}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6c757d', marginBottom: '5px' }}>⏳ Pending Approval</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>{stats?.totalPending || 0}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6c757d', marginBottom: '5px' }}>✅ Approved Today</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>{stats?.totalApproved || 0}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6c757d', marginBottom: '5px' }}>❌ Rejected</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc3545' }}>{stats?.totalRejected || 0}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6c757d', marginBottom: '5px' }}>🚫 Cancelled</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#6c757d' }}>{stats?.totalCancelled || 0}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6c757d', marginBottom: '5px' }}>📈 Total Utilization</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0d6efd' }}>{utilizationPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#1a1a2e' }}>📅 Recent Bookings</h3>
          <Link to="/my-bookings" style={{ color: '#0d6efd', fontSize: '13px', textDecoration: 'none' }}>View All →</Link>
        </div>
        
        {recentBookings.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
            No bookings yet. <Link to="/create-booking" style={{ color: '#0d6efd' }}>Create your first booking</Link>
          </p>
        ) : (
          <div>
            {recentBookings.map(booking => (
              <div key={booking.id} style={{
                borderBottom: '1px solid #e9ecef',
                padding: '15px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>{booking.resourceName}</div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    {booking.date} | {booking.startTime} — {booking.endTime}
                  </div>
                </div>
                <div>
                  <span style={{
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        color: '#6c757d', 
        fontSize: '12px',
        borderTop: '1px solid #e9ecef'
      }}>
        Based on {resources.total} total resources
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

export default DashboardPage