import { createContext, useContext, useEffect, useState } from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      const savedBookings = localStorage.getItem('stayora-bookings')

      if (!savedBookings) {
        return []
      }

      const parsedBookings = JSON.parse(savedBookings)

      return Array.isArray(parsedBookings)
        ? parsedBookings
        : []
    } catch (error) {
      console.error('Could not load saved bookings:', error)

      localStorage.removeItem('stayora-bookings')

      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        'stayora-bookings',
        JSON.stringify(bookings)
      )
    } catch (error) {
      console.error('Could not save bookings:', error)
    }
  }, [bookings])

  function addBooking(newBooking) {
    setBookings((currentBookings) => [
      ...currentBookings,
      {
        id: Date.now(),
        ...newBooking,
      },
    ])
  }

  function removeBooking(bookingId) {
    setBookings((currentBookings) =>
      currentBookings.filter(
        (booking) => booking.id !== bookingId
      )
    )
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        removeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}