import { useState, useCallback } from 'react'
import { bookingService } from '../services/bookingService'

export const useBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAllBookings = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await bookingService.getAllBookings()
      setBookings(response.bookings || [])
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchUserBookings = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await bookingService.getUserBookings()
      setBookings(response.bookings || [])
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createBooking = useCallback(async (bookingData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await bookingService.createBooking(bookingData)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateBookingStatus = useCallback(async (id, status, comment) => {
    setLoading(true)
    setError(null)
    try {
      const response = await bookingService.updateBookingStatus(id, status, comment)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update booking')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const cancelBooking = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await bookingService.cancelBooking(id)
      return response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    bookings,
    loading,
    error,
    fetchAllBookings,
    fetchUserBookings,
    createBooking,
    updateBookingStatus,
    cancelBooking
  }
}