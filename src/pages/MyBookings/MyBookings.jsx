
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useBooking } from '../../context/BookingContext'
import { hotels } from '../../data/hotels'

function MyBookings() {
  const { user } = useAuth()
  const { bookings, removeBooking } = useBooking()

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

  if (userBookings.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F1EA] px-6 pb-24 pt-32 lg:px-10 lg:pt-40">
        <div className="mx-auto flex min-h-[65vh] max-w-5xl items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#C5A880]" />

              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
                My bookings
              </p>

              <span className="h-px w-10 bg-[#C5A880]" />
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[1] text-[#171411] sm:text-7xl">
              Your next
              <span className="block italic text-[#8B7355]">
                stay awaits.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-[#6D655D]">
              You haven't made a reservation yet. Discover our carefully
              selected stays and find somewhere special.
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-5xl justify-center border-t border-[#D8D0C4] pt-8">
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

          <div className="mt-5 flex items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-5xl leading-none text-[#171411] sm:text-6xl">
                Your stays.
              </h1>

              <p className="mt-4 text-sm text-[#6D655D]">
                Your reservations in one place.
              </p>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#9A9288]">
                Reservations
              </p>

              <p className="mt-1 font-serif text-2xl text-[#171411]">
                {String(userBookings.length).padStart(2, '0')}
              </p>
            </div>
          </div>
        </header>

        {/* Sort bookings */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#8B7355]">
            Sort by
          </span>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="cursor-pointer border-b border-[#C9B38E] bg-transparent px-1 pb-2 text-[10px] uppercase tracking-[0.15em] text-[#171411] outline-none transition-colors duration-300 focus:border-[#8B7355]"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {/* Bookings */}
        <div className="mt-7 space-y-5 lg:mt-9">
          {sortedBookings.map((booking) => {
            const hotel = hotels.find(
              (hotel) => hotel.id === booking.hotelId
            )

            if (!hotel) {
              return null
            }

            let nights = 0

            if (booking.checkIn && booking.checkOut) {
              const start = new Date(booking.checkIn)
              const end = new Date(booking.checkOut)
              const difference = end - start

              nights = Math.ceil(
                difference / (1000 * 60 * 60 * 24)
              )
            }

            const totalPrice = nights * hotel.price

            return (
              <article
                key={booking.id}
                className="group overflow-hidden border border-[#C9B38E] bg-[#C5A880] shadow-[0_8px_30px_rgba(70,50,30,0.07)] transition-all duration-500 hover:shadow-[0_14px_40px_rgba(70,50,30,0.12)]"
              >
                <div className="flex flex-col gap-0 sm:flex-row">
                  {/* Small image */}
                  <div className="relative m-3 h-[220px] shrink-0 overflow-hidden sm:h-[230px] sm:w-[250px] lg:h-[245px] lg:w-[280px]">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

                    <div className="absolute bottom-5 left-5">
                      <p className="text-[9px] uppercase tracking-[0.25em] text-white/75">
                        {hotel.city}, {hotel.country}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between px-6 py-6 sm:px-7 lg:px-9 lg:py-7">
                    <div>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="font-serif text-3xl leading-tight text-[#171411]">
                            {hotel.name}
                          </h2>

                          <p className="mt-2 max-w-xl text-xs leading-6 text-[#4F463D]">
                            {hotel.description}
                          </p>
                        </div>

                        <div className="shrink-0 sm:text-right">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#171411]/55">
                            Total
                          </p>

                          <p className="mt-1 font-serif text-2xl text-[#171411]">
                            ${totalPrice}
                          </p>

                          <button
                            type="button"
                            onClick={() => removeBooking(booking.id)}
                            className="mt-3 text-[9px] uppercase tracking-[0.2em] text-[#171411]/50 transition-colors duration-300 hover:text-[#7A4B3A]"
                          >
                            Cancel reservation
                          </button>
                        </div>
                      </div>

                      {/* Booking details */}
                      <div className="mt-6 grid grid-cols-2 gap-y-5 border-t border-[#171411]/15 pt-5 sm:grid-cols-4 sm:gap-0">
                        <div className="sm:border-r sm:border-[#171411]/15 sm:pr-5">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#171411]/50">
                            Check in
                          </p>

                          <p className="mt-1.5 text-xs text-[#171411]">
                            {booking.checkIn}
                          </p>
                        </div>

                        <div className="sm:border-r sm:border-[#171411]/15 sm:px-5">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#171411]/50">
                            Check out
                          </p>

                          <p className="mt-1.5 text-xs text-[#171411]">
                            {booking.checkOut}
                          </p>
                        </div>

                        <div className="sm:border-r sm:border-[#171411]/15 sm:px-5">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#171411]/50">
                            Guests
                          </p>

                          <p className="mt-1.5 text-xs text-[#171411]">
                            {booking.guests}
                          </p>
                        </div>

                        <div className="sm:pl-5">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#171411]/50">
                            Nights
                          </p>

                          <p className="mt-1.5 text-xs text-[#171411]">
                            {nights}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex justify-end">
                      <p className="text-[10px] tracking-wide text-[#51483E]">
                        ${hotel.price} / night
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Explore stays */}
        <section className="mt-14 border-t border-[#D8D0C4] pt-9">
          <div className="flex justify-center">
            <Link
              to="/hotels"
              className="group relative mt-10 inline-flex h-[2.9em] w-[8.5em] items-center justify-end rounded-[11px] border-[0.2em] border-[#8B7355] bg-transparent text-[#0B0B0B] transition-all duration-500 ease-in-out hover:bg-[#C5A880] hover:text-[#0B0B0B]"
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
                className="absolute left-[0.8em] w-[1.6em] transition-all duration-500 ease-in-out group-hover:translate-x-5"
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

