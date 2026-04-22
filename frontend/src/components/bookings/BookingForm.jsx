import React, { useState } from 'react'

const BookingForm = ({ onSubmit, loading, initialData = {} }) => {
  const [formData, setFormData] = useState({
    resourceId: initialData.resourceId || 'RES001',
    resourceName: initialData.resourceName || 'Lecture Hall A',
    date: initialData.date || '',
    startTime: initialData.startTime || '09:00',
    endTime: initialData.endTime || '11:00',
    purpose: initialData.purpose || '',
    attendees: initialData.attendees || 1
  })

  const [errors, setErrors] = useState({})

  const resources = [
    { id: 'RES001', name: 'Lecture Hall A', type: 'Hall', capacity: 100 },
    { id: 'RES002', name: 'Lecture Hall B', type: 'Hall', capacity: 80 },
    { id: 'RES003', name: 'Computer Lab 1', type: 'Lab', capacity: 30 },
    { id: 'RES004', name: 'Meeting Room A', type: 'Room', capacity: 10 },
    { id: 'RES005', name: 'Projector', type: 'Equipment', capacity: 1 }
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
    if (!formData.startTime) newErrors.startTime = 'Start time is required'
    if (!formData.endTime) newErrors.endTime = 'End time is required'
    if (formData.startTime >= formData.endTime) newErrors.time = 'End time must be after start time'
    if (!formData.purpose) newErrors.purpose = 'Purpose is required'
    if (formData.attendees < 1) newErrors.attendees = 'At least 1 attendee required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const timeSlots = []
  for (let i = 8; i <= 20; i++) {
    const hour = i.toString().padStart(2, '0')
    timeSlots.push(`${hour}:00`)
    if (i < 20) timeSlots.push(`${hour}:30`)
  }

  return (
    <div style={{ background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
      <h2>Create New Booking</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Resource *</label>
          <select 
            name="resourceId" 
            value={formData.resourceId} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            {resources.map(res => (
              <option key={res.id} value={res.id}>{res.name} (Capacity: {res.capacity})</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          {errors.date && <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.date}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Start Time *</label>
          <select 
            name="startTime" 
            value={formData.startTime} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>End Time *</label>
          <select 
            name="endTime" 
            value={formData.endTime} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {errors.time && <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.time}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Purpose *</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows="3"
            placeholder="Describe the purpose of booking..."
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          {errors.purpose && <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.purpose}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Number of Attendees *</label>
          <input
            type="number"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            min="1"
            max="500"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          {errors.attendees && <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.attendees}</div>}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Creating...' : 'Create Booking'}
        </button>
      </form>
    </div>
  )
}

export default BookingForm