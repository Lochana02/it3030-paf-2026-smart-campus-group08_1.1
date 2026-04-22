import React from 'react'

const BookingCard = ({ booking, onCancel, onApprove, onReject, isAdmin }) => {
  // Don't render if no booking or invalid id
  if (!booking || !booking.id) {
    return null
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#ffc107'
      case 'approved': return '#28a745'
      case 'rejected': return '#dc3545'
      case 'cancelled': return '#6c757d'
      default: return '#333'
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '⏳'
      case 'approved': return '✅'
      case 'rejected': return '❌'
      case 'cancelled': return '🚫'
      default: return '📅'
    }
  }

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '8px', 
      padding: '15px', 
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${getStatusColor(booking.status)}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '24px', marginRight: '10px' }}>🏢</span>
            <h3 style={{ margin: 0 }}>{booking.resourceName}</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '10px' }}>
            <div>
              <strong>📅 Date:</strong> {booking.date}
            </div>
            <div>
              <strong>⏰ Time:</strong> {booking.startTime} - {booking.endTime}
            </div>
            <div>
              <strong>🎯 Purpose:</strong> {booking.purpose}
            </div>
            <div>
              <strong>👥 Attendees:</strong> {booking.attendees}
            </div>
          </div>
          
          {booking.adminComment && (
            <div style={{ 
              background: '#f8f9fa', 
              padding: '8px', 
              borderRadius: '5px', 
              marginTop: '10px',
              fontSize: '14px'
            }}>
              <strong>💬 Admin Comment:</strong> {booking.adminComment}
            </div>
          )}
        </div>
        
        <div style={{ textAlign: 'right', minWidth: '100px' }}>
          <div style={{
            backgroundColor: getStatusColor(booking.status),
            color: 'white',
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '12px',
            display: 'inline-block',
            marginBottom: '10px'
          }}>
            {getStatusIcon(booking.status)} {booking.status}
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
        {booking.status === 'PENDING' && (
          <>
            {isAdmin ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  style={{ 
                    padding: '8px 20px', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                  }}
                  onClick={() => onApprove?.(booking.id)}
                >
                  ✓ Approve Booking
                </button>
                <button 
                  style={{ 
                    padding: '8px 20px', 
                    backgroundColor: '#dc3545', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                  }}
                  onClick={() => onReject?.(booking.id)}
                >
                  ✗ Reject Booking
                </button>
              </div>
            ) : (
              <button 
                style={{ 
                  padding: '8px 20px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer' 
                }}
                onClick={() => onCancel?.(booking.id)}
              >
                🚫 Cancel Booking
              </button>
            )}
          </>
        )}
        {booking.status === 'APPROVED' && !isAdmin && (
          <button 
            style={{ 
              padding: '8px 20px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
            onClick={() => onCancel?.(booking.id)}
          >
            🚫 Cancel Booking
          </button>
        )}
      </div>
    </div>
  )
}

export default BookingCard