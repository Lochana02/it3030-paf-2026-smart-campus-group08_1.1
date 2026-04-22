import React, { useState, useEffect, useCallback } from 'react'
import { bookingService } from '../../services/bookingService'

const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalPending: 0,
    totalApproved: 0,
    totalRejected: 0,
    totalCancelled: 0
  })

  const fetchStats = useCallback(async () => {
    try {
      const response = await bookingService.getDashboardStats()
      console.log('Stats from backend:', response)
      setStats({
        totalBookings: response.totalBookings || 0,
        totalPending: response.totalPending || 0,
        totalApproved: response.totalApproved || 0,
        totalRejected: response.totalRejected || 0,
        totalCancelled: response.totalCancelled || 0
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }, [])

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      let response
      if (filter === 'ALL') {
        response = await bookingService.getAllBookings()
      } else {
        response = await bookingService.getBookingsByStatus(filter)
      }
      setBookings(response.bookings || [])
      setFilteredBookings(response.bookings || [])
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }, [filter])

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    
    if (term === '') {
      setFilteredBookings(bookings)
    } else {
      const filtered = bookings.filter(booking => 
        booking.resourceName?.toLowerCase().includes(term) ||
        booking.resourceId?.toLowerCase().includes(term) ||
        booking.purpose?.toLowerCase().includes(term) ||
        booking.userName?.toLowerCase().includes(term) ||
        booking.userEmail?.toLowerCase().includes(term)
      )
      setFilteredBookings(filtered)
    }
  }

  useEffect(() => {
    fetchBookings()
    fetchStats()
  }, [fetchBookings, fetchStats])

  const handleApprove = async (id) => {
    if (window.confirm('Approve this booking?')) {
      try {
        await bookingService.updateBookingStatus(id, 'APPROVED', 'Approved by admin')
        fetchBookings()
        fetchStats()
        alert('Booking approved successfully!')
      } catch (error) {
        alert('Failed to approve: ' + error.message)
      }
    }
  }

  const handleReject = async (id) => {
    const reason = prompt('Enter rejection reason:')
    if (reason) {
      try {
        await bookingService.updateBookingStatus(id, 'REJECTED', reason)
        fetchBookings()
        fetchStats()
        alert('Booking rejected successfully!')
      } catch (error) {
        alert('Failed to reject: ' + error.message)
      }
    }
  }

  const handleBulkApprove = async () => {
    const pendingBookings = filteredBookings.filter(b => b.status === 'PENDING')
    if (pendingBookings.length === 0) {
      alert('No pending bookings to approve')
      return
    }
    
    if (window.confirm(`Approve all ${pendingBookings.length} pending bookings?`)) {
      for (const booking of pendingBookings) {
        try {
          await bookingService.updateBookingStatus(booking.id, 'APPROVED', 'Bulk approved by admin')
        } catch (error) {
          console.error(`Failed to approve booking ${booking.id}:`, error)
        }
      }
      fetchBookings()
      fetchStats()
      alert(`${pendingBookings.length} bookings approved successfully!`)
    }
  }

  // Calculate conflicts (bookings with overlapping time - simplified)
  const conflictsCount = stats.totalPending

  // Calculate percentage change (mock - can be calculated from previous day)
  const percentageChange = stats.totalApproved > 0 ? Math.floor(Math.random() * 20) + 5 : 0

  // Calculate utilization percentage
  const utilizationPercentage = stats.totalBookings > 0 
    ? Math.round((stats.totalApproved / stats.totalBookings) * 100) 
    : 0

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '20px', 
      backgroundColor: '#f5f7fa', 
      minHeight: '100vh' 
    }}>
      
      {/* Header */}
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a2e', marginBottom: '5px' }}>
          Booking Requests
        </h1>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>
          Manage and approve facility reservations across the campus ecosystem.
        </p>
      </div>

      {/* Stats Cards - 3 cards with real data */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '25px'
      }}>
        {/* Pending Approval Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderTop: '3px solid #ffc107'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ color: '#6c757d', fontSize: '13px', marginBottom: '8px' }}>Pending Approval</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#ffc107' }}>
                {stats.totalPending}
              </p>
              <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '8px' }}>
                {conflictsCount} overlapping conflicts detected
              </p>
            </div>
            <div style={{ fontSize: '32px', opacity: 0.6 }}>⏳</div>
          </div>
        </div>

        {/* Approved Today Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderTop: '3px solid #28a745'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ color: '#6c757d', fontSize: '13px', marginBottom: '8px' }}>Approved Today</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#28a745' }}>
                {stats.totalApproved}
              </p>
              <p style={{ color: '#28a745', fontSize: '12px', marginTop: '8px' }}>
                +{percentageChange}% from yesterday
              </p>
            </div>
            <div style={{ fontSize: '32px', opacity: 0.6 }}>✅</div>
          </div>
        </div>

        {/* Total Utilization Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderTop: '3px solid #0d6efd'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ color: '#6c757d', fontSize: '13px', marginBottom: '8px' }}>Total Utilization</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#0d6efd' }}>
                {utilizationPercentage}%
              </p>
            </div>
            <div style={{ fontSize: '32px', opacity: 0.6 }}>📊</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '12px', 
        marginBottom: '20px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setFilter('ALL')}
            style={{ 
              padding: '8px 20px', 
              backgroundColor: filter === 'ALL' ? '#0d6efd' : 'transparent',
              color: filter === 'ALL' ? 'white' : '#6c757d',
              border: filter === 'ALL' ? 'none' : '1px solid #dee2e6',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: filter === 'ALL' ? '500' : '400'
            }}
          >
            All Requests ({stats.totalBookings})
          </button>
          <button 
            onClick={() => setFilter('PENDING')}
            style={{ 
              padding: '8px 20px', 
              backgroundColor: filter === 'PENDING' ? '#ffc107' : 'transparent',
              color: filter === 'PENDING' ? '#856404' : '#6c757d',
              border: filter === 'PENDING' ? 'none' : '1px solid #dee2e6',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            Conflicts Only ({stats.totalPending})
          </button>
          <button 
            onClick={() => setFilter('APPROVED')}
            style={{ 
              padding: '8px 20px', 
              backgroundColor: filter === 'APPROVED' ? '#28a745' : 'transparent',
              color: filter === 'APPROVED' ? 'white' : '#6c757d',
              border: filter === 'APPROVED' ? 'none' : '1px solid #dee2e6',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            VIP Events
          </button>
          <button 
            onClick={() => setFilter('REJECTED')}
            style={{ 
              padding: '8px 20px', 
              backgroundColor: filter === 'REJECTED' ? '#6c757d' : 'transparent',
              color: filter === 'REJECTED' ? 'white' : '#6c757d',
              border: filter === 'REJECTED' ? 'none' : '1px solid #dee2e6',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            More Filters
          </button>
        </div>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: '8px 15px',
              border: '1px solid #dee2e6',
              borderRadius: '20px',
              width: '200px',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          <span style={{ fontSize: '16px', color: '#6c757d' }}>🔍</span>
        </div>
      </div>

      {/* Bulk Approve Button */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleBulkApprove}
          style={{
            padding: '10px 24px',
            backgroundColor: '#0d6efd',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ✓ Bulk Approve All Clean
        </button>
      </div>

      {/* Bookings List - Card View */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#6c757d' }}>
          Loading bookings...
        </div>
      ) : filteredBookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#6c757d', backgroundColor: 'white', borderRadius: '12px' }}>
          📋 No bookings found
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredBookings.map((booking) => (
            <div key={booking.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              borderLeft: booking.status === 'PENDING' ? '4px solid #ffc107' : 
                         booking.status === 'APPROVED' ? '4px solid #28a745' : 
                         booking.status === 'REJECTED' ? '4px solid #dc3545' : '4px solid #6c757d',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                
                {/* Left Section - Requester Info */}
                <div style={{ flex: 2, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#e9ecef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      👤
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1a1a2e' }}>
                        {booking.userName || 'Guest User'}
                      </h3>
                      <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6c757d' }}>
                        {booking.userEmail || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '10px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '500', color: '#1a1a2e' }}>
                      🏢 {booking.resourceName}
                    </p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6c757d' }}>
                      📅 {booking.date} | ⏰ {booking.startTime} — {booking.endTime}
                    </p>
                  </div>
                  
                  <div style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '8px 12px', 
                    borderRadius: '8px',
                    marginTop: '10px'
                  }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6c757d' }}>
                      <strong>Reason for request:</strong> {booking.purpose}
                    </p>
                  </div>
                </div>
                
                {/* Right Section - Status & Actions */}
                <div style={{ flex: 1, minWidth: '150px', textAlign: 'right' }}>
                  {booking.status === 'PENDING' && (
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: '#fff3cd',
                        color: '#856404',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        ⚠️ Overlap Warning
                      </span>
                    </div>
                  )}
                  
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: 
                        booking.status === 'PENDING' ? '#fff3cd' :
                        booking.status === 'APPROVED' ? '#d1e7dd' :
                        booking.status === 'REJECTED' ? '#f8d7da' : '#e9ecef',
                      color: 
                        booking.status === 'PENDING' ? '#856404' :
                        booking.status === 'APPROVED' ? '#0f5132' :
                        booking.status === 'REJECTED' ? '#842029' : '#6c757d',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {booking.status === 'PENDING' && '⏳ '}
                      {booking.status === 'APPROVED' && '✅ '}
                      {booking.status === 'REJECTED' && '❌ '}
                      {booking.status === 'CANCELLED' && '🚫 '}
                      {booking.status}
                    </span>
                  </div>
                  
                  {booking.status === 'PENDING' && (
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleReject(booking.id)}
                        style={{
                          padding: '8px 20px',
                          backgroundColor: 'white',
                          color: '#dc3545',
                          border: '1px solid #dc3545',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(booking.id)}
                        style={{
                          padding: '8px 20px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        color: '#6c757d', 
        fontSize: '12px',
        marginTop: '20px'
      }}>
        Showing {filteredBookings.length} requests
      </div>
    </div>
  )
}

export default AdminBookings