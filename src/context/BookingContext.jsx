
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      const savedBookings = localStorage.getItem(
        'stayora-bookings'
      )

      if (!savedBookings) {
        return []
      }

      const parsedBookings = JSON.parse(savedBookings)

      return Array.isArray(parsedBookings)
        ? parsedBookings
        : []
    } catch (error) {
      console.error(
        'Could not load saved bookings:',
        error
      )

      localStorage.removeItem('stayora-bookings')

      return []
    }
  })

  const [walletBalance, setWalletBalance] = useState(() => {
    try {
      const savedWallet = localStorage.getItem(
        'stayora-wallet'
      )

      if (!savedWallet) {
        return 0
      }

      const parsedWallet = Number(savedWallet)

      return Number.isFinite(parsedWallet)
        ? parsedWallet
        : 0
    } catch (error) {
      console.error(
        'Could not load wallet balance:',
        error
      )

      localStorage.removeItem('stayora-wallet')

      return 0
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        'stayora-bookings',
        JSON.stringify(bookings)
      )
    } catch (error) {
      console.error(
        'Could not save bookings:',
        error
      )
    }
  }, [bookings])

  useEffect(() => {
    try {
      localStorage.setItem(
        'stayora-wallet',
        String(walletBalance)
      )
    } catch (error) {
      console.error(
        'Could not save wallet balance:',
        error
      )
    }
  }, [walletBalance])

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

  function addToWallet(amount) {
    const refundAmount = Number(amount)

    if (
      !Number.isFinite(refundAmount) ||
      refundAmount <= 0
    ) {
      return
    }

    setWalletBalance((currentBalance) =>
      Number(
        (currentBalance + refundAmount).toFixed(2)
      )
    )
  }

  function payWithWallet(amount) {
    const paymentAmount = Number(amount)

    if (
      !Number.isFinite(paymentAmount) ||
      paymentAmount <= 0
    ) {
      return false
    }

    if (walletBalance < paymentAmount) {
      return false
    }

    setWalletBalance((currentBalance) =>
      Number(
        (currentBalance - paymentAmount).toFixed(2)
      )
    )

    return true
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        walletBalance,
        addBooking,
        removeBooking,
        addToWallet,
        payWithWallet,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}

