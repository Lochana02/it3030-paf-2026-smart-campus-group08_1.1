import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookingService } from '../services/bookingService'

const CreateBookingPage = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    resourceId: 'RES001',
    resourceName: 'Lecture Hall A',
    date: '',
    startTime: '09:00',
    endTime: '11:00',
    purpose: '',
    attendees: 1
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const resources = [
    { id: 'RES001', name: 'Main Auditorium (A-102)', type: 'Auditorium', capacity: 200 },
    { id: 'RES002', name: 'Green Plaza (Outdoor)', type: 'Outdoor', capacity: 500 },
    { id: 'RES003', name: 'Bio-Lab 4 (Restricted)', type: 'Laboratory', capacity: 30 },
    { id: 'RES004', name: 'Lecture Hall B', type: 'Hall', capacity: 100 },
    { id: 'RES005', name: 'Computer Lab 1', type: 'Lab', capacity: 40 }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'resourceId') {
      const selected = resources.find(r => r.id === value)
      if (selected) {
        setFormData(prev => ({ ...prev, resourceName: selected.name }))
      }
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.date) newErrors.date = 'Date is required'
    if (formData.startTime >= formData.endTime) newErrors.time = 'End time must be after start time'
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required'
    if (formData.attendees < 1) newErrors.attendees = 'At least 1 attendee required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await bookingService.createBooking(formData)
      alert('Booking created successfully!')
      navigate('/my-bookings')
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create booking'
      alert('Error: ' + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const timeSlots = []
  for (let i = 8; i <= 20; i++) {
    const hour = i.toString().padStart(2, '0')
    timeSlots.push(`${hour}:00`)
    if (i < 20) timeSlots.push(`${hour}:30`)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#1a1a2e' }}>Create New Booking</h1>
        <p style={{ color: '#6c757d' }}>Book a resource for your academic or meeting needs</p>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Resource *</label>
          <select 
            name="resourceId" 
            value={formData.resourceId} 
            onChange={handleChange}
            style={{ width: '100%', padding: '12px', border: '1px solid #dee2e6', borderRadius: '8px', fontSize: '14px' }}
          >
            {resources.map(res => (
              <option key={res.id} value={res.id}>{res.name} (Capacity: {res.capacity})</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            style={{ width: '100%', padding: '12px', border: '1px solid #dee2e6', borderRadius: '8px', fontSize: '14px' }}
          />
          {errors.date && <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.date}</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Start Time *</label>
            <select 
              name="startTime" 
              value={formData.startTime} 
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #dee2e6', borderRadius: '8px', fontSize: '14px' }}
            >
              {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>End Time *</label>
            <select 
              name="endTime" 
              value={formData.endTime} 
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #dee2e6', borderRadius: '8px', fontSize: '14px' }}
            >
              {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
            </select>
            {errors.time && <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.time}</p>}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Purpose / Reason for request *</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the purpose of your booking..."
            style={{ width: '100%', padding: '12px', border: '1px solid #dee2e6', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
          />
          {errors.purpose && <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.purpose}</p>}
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Number of Attendees *</label>
          <input
            type="number"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            min="1"
            max="500"
            style={{ width: '100%', padding: '12px', border: '1px solid #dee2e6', borderRadius: '8px', fontSize: '14px' }}
          />
          {errors.attendees && <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.attendees}</p>}
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 30px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Creating...' : 'Submit Request'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/my-bookings')}
            style={{
              padding: '12px 30px',
              backgroundColor: 'white',
              color: '#6c757d',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBookingPage