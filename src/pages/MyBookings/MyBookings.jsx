
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useBooking } from '../../context/BookingContext'
import { hotels } from '../../data/hotels'

function MyBookings() {
  const { user } = useAuth()
  const {
    bookings,
    removeBooking,
    walletBalance,
    addToWallet,
  } = useBooking()

  const [sortOrder, setSortOrder] = useState('newest')

  const userBookings = bookings.filter(
    (booking) =>
      booking.email?.toLowerCase() === user?.email?.toLowerCase()
  )

  const sortedBookings = [...userBookings].sort((a, b) => {
    if (sortOrder === 'newest') {
      return b.id - a.id
    }

    return a.id - b.id
  })

  function getNights(booking) {
    if (!booking.checkIn || !booking.checkOut) {
      return 0
    }

    const start = new Date(`${booking.checkIn}T00:00:00`)
    const end = new Date(`${booking.checkOut}T00:00:00`)
    const difference = end - start

    if (difference <= 0) {
      return 0
    }

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )
  }

  function handleCancel(booking) {
    const paidAmount = Number(
      booking.paidAmount ?? booking.totalPrice ?? 0
    )

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const checkInDate = booking.checkIn
      ? new Date(`${booking.checkIn}T00:00:00`)
      : null

    let daysUntilCheckIn = -1

    if (
      checkInDate &&
      !Number.isNaN(checkInDate.getTime())
    ) {
      const difference = checkInDate - today

      daysUntilCheckIn = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      )
    }

    let refundPercentage = 0
    let cancellationMessage = ''

    if (daysUntilCheckIn > 20) {
      refundPercentage = 0.95
      cancellationMessage =
        'You will receive 95% of your paid amount in your wallet after a 5% cancellation fee.'
    } else if (daysUntilCheckIn >= 14) {
      refundPercentage = 0.85
      cancellationMessage =
        'You will receive 85% of your paid amount in your wallet after a 15% cancellation fee.'
    } else {
      refundPercentage = 0
      cancellationMessage =
        'No amount will be refunded for this cancellation.'
    }

    const refundAmount = Number(
      (paidAmount * refundPercentage).toFixed(2)
    )

    const formattedRefund = refundAmount.toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )

    const message =
      refundAmount > 0
        ? `${cancellationMessage}\n\nRefund amount: $${formattedRefund}\n\nDo you want to cancel this reservation?`
        : `${cancellationMessage}\n\nDo you want to cancel this reservation?`

    const confirmed = window.confirm(message)

    if (!confirmed) {
      return
    }

    if (refundAmount > 0) {
      addToWallet(refundAmount)
    }

    removeBooking(booking.id)
  }

  if (userBookings.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F1EA] px-5 pb-24 pt-28 sm:px-8 lg:px-10 lg:pt-36">
        <div className="mx-auto flex min-h-[65vh] max-w-5xl items-center justify-center">
          <div className="w-full max-w-2xl text-center">

            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[#C5A880]" />

              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
                My bookings
              </p>

              <span className="h-px w-10 bg-[#C5A880]" />
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.95] text-[#171411] sm:text-7xl">
              Your next
              <span className="block italic text-[#8B7355]">
                stay awaits.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-[#6D655D]">
              You haven't made a reservation yet. Discover our carefully
              selected stays and find somewhere special.
            </p>

            <div className="mt-10 flex justify-center border-t border-[#D8D0C4] pt-8">
              <Link
                to="/hotels"
                className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-[#171411]"
              >
                <span className="border-b border-[#171411] pb-2 transition-colors duration-300 group-hover:border-[#8B7355] group-hover:text-[#8B7355]">
                  Explore stays
                </span>

                <span className="text-[#8B7355] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F1EA] px-5 pb-24 pt-28 sm:px-8 lg:px-10 lg:pt-36">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="border-b border-[#D8D0C4] pb-10 lg:pb-12">

          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-[#C5A880]" />

            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
              My bookings
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="font-serif text-5xl leading-none text-[#171411] sm:text-6xl">
                Your stays.
              </h1>

              <p className="mt-4 text-sm text-[#6D655D]">
                Your reservations in one place.
              </p>
            </div>

            {/* Wallet */}
            <div className="border border-[#D8D0C4] bg-white px-5 py-4 shadow-[0_15px_45px_rgba(0,0,0,0.035)] sm:min-w-[210px]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#8B7355]">
                    My wallet
                  </p>

                  <p className="mt-2 font-serif text-3xl text-[#171411]">
                    $
                    {Number(walletBalance || 0).toLocaleString(
                      'en-US',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center border border-[#D8D0C4] text-[#8B7355]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5v-9z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 13h5"
                    />

                    <circle
                      cx="16"
                      cy="13"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </div>
              </div>

              <p className="mt-3 border-t border-[#E5DED3] pt-3 text-[9px] leading-5 text-[#AAA39A]">
                Refunds from cancelled reservations appear here.
              </p>
            </div>

          </div>
        </header>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-4 border-b border-[#D8D0C4] pb-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[10px] uppercase tracking-[0.25em] text-[#AAA39A]">
            {userBookings.length === 1
              ? '1 reservation'
              : `${userBookings.length} reservations`}
          </p>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#8B7355]">
              Sort by
            </span>

            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="
                  min-w-[145px]
                  cursor-pointer
                  appearance-none
                  border
                  border-[#D8D0C4]
                  bg-white
                  px-4
                  py-3
                  pr-10
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  text-[#171411]
                  outline-none
                  transition
                  duration-300
                  hover:border-[#8B7355]
                  focus:border-[#8B7355]
                "
              >
                <option value="newest">
                  Newest first
                </option>

                <option value="oldest">
                  Oldest first
                </option>
              </select>

              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7355]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01-1.08-1.04l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="mt-8 space-y-6">

          {sortedBookings.map((booking) => {
            const hotel = hotels.find(
              (item) => item.id === booking.hotelId
            )

            if (!hotel) {
              return null
            }

            const nights = getNights(booking)
            const totalPrice = nights * hotel.price

            return (
              <article
                key={booking.id}
                className="
                  group
                  border
                  border-[#D8D0C4]
                  bg-white
                  p-4
                  shadow-[0_20px_60px_rgba(0,0,0,0.04)]
                  transition
                  duration-500
                  hover:border-[#C9B38E]
                  hover:shadow-[0_25px_70px_rgba(0,0,0,0.07)]
                  sm:p-5
                "
              >

                {/* Top section */}
                <div className="flex flex-col gap-6 md:flex-row">

                  {/* Image */}
                  <div className="group/image relative h-[230px] shrink-0 overflow-hidden sm:h-[260px] md:h-[235px] md:w-[280px] lg:h-[250px] lg:w-[320px]">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover/image:scale-[1.04]
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

                    <div className="absolute bottom-5 left-5">
                      <p className="text-[9px] uppercase tracking-[0.25em] text-white/75">
                        {hotel.city}, {hotel.country}
                      </p>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-1 md:py-2">

                    <div>

                      {/* Title + total */}
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                        <div className="min-w-0">
                          <p className="text-[9px] uppercase tracking-[0.25em] text-[#8B7355]">
                            Reserved stay
                          </p>

                          <h2 className="mt-2 font-serif text-3xl leading-tight text-[#171411] sm:text-4xl">
                            {hotel.name}
                          </h2>

                          <p className="mt-3 max-w-2xl text-xs leading-6 text-[#6D655D]">
                            {hotel.description}
                          </p>
                        </div>

                        <div className="shrink-0 sm:text-right">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#AAA39A]">
                            Total
                          </p>

                          <p className="mt-1 font-serif text-3xl text-[#171411]">
                            ${totalPrice}
                          </p>

                          <p className="mt-1 text-[10px] text-[#AAA39A]">
                            ${hotel.price} / night
                          </p>
                        </div>

                      </div>

                      {/* Booking details */}
                      <div className="mt-7 grid grid-cols-2 border-t border-[#E5DED3] pt-6 md:grid-cols-4">

                        <div className="border-b border-[#E5DED3] pb-5 md:border-b-0 md:border-r md:pb-0 md:pr-5">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#AAA39A]">
                            Check in
                          </p>

                          <p className="mt-2 text-xs text-[#171411]">
                            {booking.checkIn}
                          </p>
                        </div>

                        <div className="border-b border-[#E5DED3] pb-5 pl-5 md:border-b-0 md:border-r md:px-5">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#AAA39A]">
                            Check out
                          </p>

                          <p className="mt-2 text-xs text-[#171411]">
                            {booking.checkOut}
                          </p>
                        </div>

                        <div className="pt-5 md:border-r md:border-[#E5DED3] md:px-5 md:pt-0">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#AAA39A]">
                            Guests
                          </p>

                          <p className="mt-2 text-xs text-[#171411]">
                            {booking.guests}
                          </p>
                        </div>

                        <div className="border-l border-[#E5DED3] pl-5 pt-5 md:border-l-0 md:pl-5 md:pt-0">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#AAA39A]">
                            Nights
                          </p>

                          <p className="mt-2 text-xs text-[#171411]">
                            {nights}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex flex-col gap-4 border-t border-[#E5DED3] px-1 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">
                    <span className="h-px w-6 bg-[#C5A880]" />

                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#8B7355]">
                      Reservation #{String(booking.id).slice(-4)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCancel(booking)}
                    aria-label="Cancel reservation"
                    className="
                      group/bin
                      flex
                      items-center
                      gap-2
                      self-start
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-[#8A8178]
                      transition
                      duration-300
                      hover:text-[#9D3027]
                      sm:self-auto
                    "
                  >
                    <img
                      src="/bin.svg"
                      alt=""
                      className="
                        h-4
                        w-4
                        opacity-55
                        transition-all
                        duration-300
                        group-hover/bin:scale-110
                        group-hover/bin:opacity-100
                        group-hover/bin:[filter:brightness(0)_saturate(100%)_invert(24%)_sepia(82%)_saturate(1484%)_hue-rotate(333deg)_brightness(89%)_contrast(91%)]
                      "
                    />

                    <span>
                      Cancel reservation
                    </span>
                  </button>

                </div>
              </article>
            )
          })}
        </div>

        {/* Explore */}
        <section className="mt-16 border-t border-[#D8D0C4] pt-10">
          <div className="flex justify-center">
            <Link
              to="/hotels"
              className="
                group
                relative
                inline-flex
                h-[2.9em]
                w-[9.5em]
                items-center
                justify-end
                rounded-[11px]
                border-[0.2em]
                border-[#8B7355]
                bg-transparent
                text-[#0B0B0B]
                transition-all
                duration-500
                ease-in-out
                hover:bg-[#C5A880]
              "
            >
              <span className="mr-[1.5em] text-xs">
                Explore stays
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="
                  absolute
                  left-[0.8em]
                  w-[1.6em]
                  transition-all
                  duration-500
                  ease-in-out
                  group-hover:translate-x-1
                "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-6-6 6 6-6 6"
                />
              </svg>
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}

export default MyBookings
