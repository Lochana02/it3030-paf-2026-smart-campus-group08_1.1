/**
 * Format date to YYYY-MM-DD
 */
export const formatDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Format time to HH:MM
 */
export const formatTime = (time) => {
  if (!time) return ''
  return time.substring(0, 5)
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = () => {
  return formatDate(new Date())
}

/**
 * Get tomorrow's date
 */
export const getTomorrowDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return formatDate(tomorrow)
}

/**
 * Check if a date is in the past
 */
export const isPastDate = (dateString) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const checkDate = new Date(dateString)
  checkDate.setHours(0, 0, 0, 0)
  return checkDate < today
}

/**
 * Check if a date is today
 */
export const isToday = (dateString) => {
  const today = formatDate(new Date())
  return dateString === today
}

/**
 * Get readable date format (e.g., "Jan 15, 2026")
 */
export const getReadableDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Get readable time format (e.g., "10:30 AM")
 */
export const getReadableTime = (timeString) => {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

/**
 * Get readable date and time
 */
export const getReadableDateTime = (dateString, timeString) => {
  return `${getReadableDate(dateString)} at ${getReadableTime(timeString)}`
}

/**
 * Generate time slots (30-minute intervals)
 */
export const generateTimeSlots = (startHour = 8, endHour = 20) => {
  const slots = []
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === endHour && minute > 0) continue
      const hourStr = hour.toString().padStart(2, '0')
      const minuteStr = minute.toString().padStart(2, '0')
      slots.push(`${hourStr}:${minuteStr}`)
    }
  }
  return slots
}

/**
 * Check if two time ranges overlap
 */
export const doesTimeOverlap = (start1, end1, start2, end2) => {
  return (start1 < end2 && end1 > start2)
}

/**
 * Get duration in hours between two times
 */
export const getDuration = (startTime, endTime) => {
  const start = new Date(`2000-01-01T${startTime}:00`)
  const end = new Date(`2000-01-01T${endTime}:00`)
  const durationMs = end - start
  const durationHours = durationMs / (1000 * 60 * 60)
  return durationHours
}

/**
 * Validate time range
 */
export const isValidTimeRange = (startTime, endTime) => {
  if (!startTime || !endTime) return false
  return startTime < endTime
}

/**
 * Get week days
 */
export const getWeekDays = () => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

/**
 * Get month names
 */
export const getMonthNames = () => {
  return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}