
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
<div className="mt-8 flex items-center justify-end gap-4">
  <span className="text-[9px] uppercase tracking-[0.3em] text-[#8B7355]">
    Sort by
  </span>

  <div className="relative">
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="
        min-w-[150px]
        cursor-pointer
        appearance-none
        border
        border-[#C9B38E]
        bg-[#EEE7DC]
        px-4
        py-3
        pr-10
        text-[10px]
        uppercase
        tracking-[0.15em]
        text-[#171411]
        shadow-[0_4px_15px_rgba(70,50,30,0.06)]
        outline-none
        transition-all
        duration-300
        hover:border-[#8B7355]
        hover:bg-[#E8DFD1]
        hover:shadow-[0_6px_20px_rgba(70,50,30,0.1)]
        focus:border-[#8B7355]
        focus:shadow-[0_0_0_2px_rgba(139,115,85,0.12)]
      "
    >
      <option
        value="newest"
        className="bg-[#F5F1EA] text-[#171411]"
      >
        Newest first
      </option>

      <option
        value="oldest"
        className="bg-[#F5F1EA] text-[#171411]"
      >
        Oldest first
      </option>
    </select>

    {/* Custom arrow */}
    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7355]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3.5 w-3.5"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
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
                className="group relative overflow-hidden border border-[#C9B38E] bg-[#C5A880] shadow-[0_8px_30px_rgba(70,50,30,0.07)] transition-all duration-500 hover:shadow-[0_14px_40px_rgba(70,50,30,0.12)]"
              >
                {/* 
                  Mobile + Small screens:
                  Image on top / Booking information below

                  Medium screens and above:
                  Image on left / Booking information on right
                */}
                <div className="flex flex-col gap-0 md:flex-row">

                  {/* Small image */}
                  
{/* Image */}
<div
  className="
    relative
    m-5
    h-[220px]
    shrink-0
    overflow-hidden
    rounded-sm
    shadow-[0_12px_30px_rgba(11,11,11,0.22)]
    md:m-6
    md:h-[230px]
    md:w-[250px]
    lg:h-[245px]
    lg:w-[280px]
  "
>
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
      group-hover:scale-105
    "
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

  <div className="absolute bottom-5 left-5">
    <p className="text-[9px] uppercase tracking-[0.25em] text-white/75">
      {hotel.city}, {hotel.country}
    </p>
  </div>
</div>



                  {/* Content */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between px-6 py-6 md:px-7 lg:px-9 lg:py-7">
                    <div>

                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h2 className="font-serif text-3xl leading-tight text-[#171411]">
                            {hotel.name}
                          </h2>

                          <p className="mt-2 max-w-xl text-xs leading-6 text-[#4F463D]">
                            {hotel.description}
                          </p>
                        </div>

                        <div className="shrink-0 md:text-right">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#171411]/55">
                            Total
                          </p>

                          <p className="mt-1 font-serif text-2xl text-[#171411]">
                            ${totalPrice}
                          </p>









                        </div>
                      </div>

                      {/* Booking details */}
                      <div className="mt-6 grid grid-cols-2 gap-y-5 border-t border-[#171411]/15 pt-5 md:grid-cols-4 md:gap-0">

                        <div className="md:border-r md:border-[#171411]/15 md:pr-5">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#171411]/50">
                            Check in
                          </p>

                          <p className="mt-1.5 text-xs text-[#171411]">
                            {booking.checkIn}
                          </p>
                        </div>

                        <div className="md:border-r md:border-[#171411]/15 md:px-5">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#171411]/50">
                            Check out
                          </p>

                          <p className="mt-1.5 text-xs text-[#171411]">
                            {booking.checkOut}
                          </p>
                        </div>

                        <div className="md:border-r md:border-[#171411]/15 md:px-5">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#171411]/50">
                            Guests
                          </p>

                          <p className="mt-1.5 text-xs text-[#171411]">
                            {booking.guests}
                          </p>
                        </div>

                        <div className="md:pl-5">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[#171411]/50">
                            Nights
                          </p>

                          <p className="mt-1.5 text-xs text-[#171411]">
                            {nights}
                          </p>
                        </div>

                      </div>
                    </div>

                    
                  </div>

                </div>
                <div className=' m-3 flex justify-between items-center'>

                  <div >
                      <p className="text-xl mx-5 tracking-wide text-[#51483E]">
                        ${hotel.price} / night
                      </p>
                    </div>
                <button
  type="button"
  onClick={() => removeBooking(booking.id)}
  aria-label="Cancel reservation"
  className="
    group/bin
    
    
    z-10
    flex
    flex-col
    items-center
    gap-1
    
  "
>
  <img
    src="/bin.svg"
    alt=""
    className="
      h-5
      w-5
      opacity-60
      transition-all
      duration-300
      group-hover/bin:scale-110
      group-hover/bin:opacity-100
      group-hover/bin:[filter:brightness(0)_saturate(100%)_invert(24%)_sepia(82%)_saturate(1484%)_hue-rotate(333deg)_brightness(89%)_contrast(91%)]
    "
  />

  <span
    className="
      max-h-0
      overflow-hidden
      text-[8px]
      uppercase
      tracking-[0.15em]
      text-red-700
      opacity-0
      transition-all
      duration-300
      group-hover/bin:max-h-5
      group-hover/bin:opacity-100
    "
  >
    Cancel reservation
  </span>
</button>
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
            className="
              group
              relative
              mt-10
              inline-flex
              h-[2.9em]
              w-[8.5em]
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
              hover:text-[#0B0B0B]
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
                group-hover:translate-x-5px
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
