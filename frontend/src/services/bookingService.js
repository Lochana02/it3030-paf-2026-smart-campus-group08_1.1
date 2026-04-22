import api from './api'

export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/api/bookings', bookingData)
    return response.data
  },

  // Get all bookings for current user
  getUserBookings: async () => {
    const response = await api.get('/api/bookings/my')
    return response.data
  },

  // Get all bookings (Admin only)
  getAllBookings: async () => {
    const response = await api.get('/api/bookings/admin/all')
    return response.data
  },

  // Get booking by ID - FIXED
  getBookingById: async (id) => {
    if (!id || id === 'my') {
      console.error('Invalid booking ID:', id)
      return { success: false, booking: null }
    }
    const response = await api.get(`/api/bookings/${id}`)
    return response.data
  },

  // Get bookings by status (Admin)
  getBookingsByStatus: async (status) => {
    const response = await api.get(`/api/bookings/admin/status/${status}`)
    return response.data
  },

  // Update booking status (Admin)
  updateBookingStatus: async (id, status, comment) => {
    const response = await api.put(`/api/bookings/admin/${id}/status`, {
      status,
      comment
    })
    return response.data
  },

  // Cancel booking
  cancelBooking: async (id) => {
    const response = await api.delete(`/api/bookings/${id}`)
    return response.data
  },

  // Get dashboard stats (Admin) - FIXED: added .data
  getDashboardStats: async () => {
    const response = await api.get('/api/bookings/admin/dashboard/stats')
    return response.data  // ← මේක හරි! (response වෙනුවට response.data)
  }
}