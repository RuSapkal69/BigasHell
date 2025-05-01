/**
 * Format a date string or Date object to a readable format
 * @param {string|Date} dateString - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
    if (!dateString) return "N/A"
  
    try {
      const date = new Date(dateString)
  
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "N/A"
      }
  
      const defaultOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
  
      return date.toLocaleDateString(undefined, { ...defaultOptions, ...options })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "N/A"
    }
  }
  
  /**
   * Format time in minutes to hours and minutes
   * @param {number} minutes - Time in minutes
   * @returns {string} Formatted time string
   */
  export const formatTime = (minutes) => {
    if (!minutes && minutes !== 0) return "N/A"
  
    try {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
  
      if (hours > 0) {
        return `${hours}h ${mins}m`
      } else {
        return `${mins}m`
      }
    } catch (error) {
      console.error("Error formatting time:", error)
      return "N/A"
    }
  }
  
  /**
   * Get today's date as an ISO string (YYYY-MM-DD)
   * @returns {string} Today's date in ISO format
   */
  export const getTodayISO = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }
  
  /**
   * Add days to a date
   * @param {Date} date - Starting date
   * @param {number} days - Number of days to add
   * @returns {Date} New date
   */
  export const addDays = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }
  