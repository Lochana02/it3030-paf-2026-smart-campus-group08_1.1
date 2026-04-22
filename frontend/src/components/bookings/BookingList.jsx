import React from 'react'
import BookingCard from './BookingCard'

const BookingList = ({ bookings, onCancel, onApprove, onReject, isAdmin }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <p>No bookings found.</p>
      </div>
    )
  }

  return (
    <div className="bookings-list">
      <table>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Date</th>
            <th>Time</th>
            <th>Purpose</th>
            <th>Attendees</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.resourceName}</td>
              <td>{booking.date}</td>
              <td>{booking.startTime} - {booking.endTime}</td>
              <td>{booking.purpose}</td>
              <td>{booking.attendees}</td>
              <td>
                <span className={`status-${booking.status?.toLowerCase()}`}>
                  {booking.status}
                </span>
              </td>
              <td>
                {booking.status === 'PENDING' && (
                  <>
                    {isAdmin ? (
                      <>
                        <button
                          className="btn btn-success"
                          style={{ marginRight: '5px', padding: '5px 10px' }}
                          onClick={() => onApprove?.(booking.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ padding: '5px 10px' }}
                          onClick={() => onReject?.(booking.id)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-danger"
                        style={{ padding: '5px 10px' }}
                        onClick={() => onCancel?.(booking.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </>
                )}
                {booking.status === 'APPROVED' && !isAdmin && (
                  <button
                    className="btn btn-danger"
                    style={{ padding: '5px 10px' }}
                    onClick={() => onCancel?.(booking.id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookingList