
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useBooking } from '../../context/BookingContext'
import { hotels } from '../../data/hotels'

function MyBookings() {
  const { user } = useAuth()
  const { bookings } = useBooking()

  const userBookings = bookings.filter(
    (booking) =>
      booking.email?.toLowerCase() === user?.email?.toLowerCase()
  )

  if (userBookings.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F1EA] px-6 pb-24 pt-32 lg:px-10 lg:pt-40">
        <div className="mx-auto flex min-h-[65vh] max-w-5xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center gap-3">
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
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-[#D8D0C4] pb-12 lg:pb-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#C5A880]" />

            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
              My bookings
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-5xl leading-none tracking-tight text-[#171411] sm:text-6xl lg:text-7xl">
                Your stays.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#6D655D]">
                A collection of your reservations, all in one place.
              </p>
            </div>

            <div className="sm:pb-1">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#9A9288]">
                Reservations
              </p>

              <p className="mt-1 font-serif text-3xl text-[#171411]">
                {String(userBookings.length).padStart(2, '0')}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-12 space-y-10 lg:mt-14">
          {userBookings.map((booking) => {
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
                className="group overflow-hidden rounded-[2px] border border-[#B59A72] bg-[#C5A880] shadow-[0_18px_55px_rgba(60,45,25,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(60,45,25,0.18)]"
              >
                <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                  {/* Hotel image */}
                  <div className="relative min-h-[300px] overflow-hidden sm:min-h-[400px] lg:min-h-[500px]">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                    <div className="absolute bottom-7 left-7 right-7 sm:bottom-9 sm:left-9">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/75">
                        {hotel.city}, {hotel.country}
                      </p>

                      <h2 className="mt-2 font-serif text-4xl leading-tight text-white sm:text-5xl">
                        {hotel.name}
                      </h2>
                    </div>
                  </div>

                  {/* Booking information */}
                  <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-11">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-[#171411]/40" />

                        <p className="text-[9px] uppercase tracking-[0.3em] text-[#171411]/65">
                          Reservation details
                        </p>
                      </div>

                      <h3 className="mt-5 font-serif text-3xl text-[#171411] sm:text-4xl">
                        Your reservation
                      </h3>

                      <p className="mt-5 max-w-xl text-sm leading-7 text-[#3F372F]">
                        {hotel.description}
                      </p>

                      <div className="mt-9 overflow-hidden rounded-sm border border-[#171411]/15 bg-white/15">
                        <div className="grid sm:grid-cols-2">
                          <div className="border-b border-[#171411]/15 px-5 py-5 sm:border-r sm:pr-6">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#171411]/55">
                              Check in
                            </p>

                            <p className="mt-2 text-sm font-medium text-[#171411]">
                              {booking.checkIn}
                            </p>
                          </div>

                          <div className="border-b border-[#171411]/15 px-5 py-5 sm:pl-6">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#171411]/55">
                              Check out
                            </p>

                            <p className="mt-2 text-sm font-medium text-[#171411]">
                              {booking.checkOut}
                            </p>
                          </div>

                          <div className="border-b border-[#171411]/15 px-5 py-5 sm:border-b-0 sm:border-r sm:pr-6">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#171411]/55">
                              Guests
                            </p>

                            <p className="mt-2 text-sm font-medium text-[#171411]">
                              {booking.guests}
                            </p>
                          </div>

                          <div className="px-5 py-5 sm:pl-6">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#171411]/55">
                              Nights
                            </p>

                            <p className="mt-2 text-sm font-medium text-[#171411]">
                              {nights}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex items-end justify-between border-t border-[#171411]/20 pt-6">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#171411]/55">
                          Total
                        </p>

                        <p className="mt-2 font-serif text-4xl text-[#171411]">
                          ${totalPrice}
                        </p>
                      </div>

                      <p className="pb-1 text-xs text-[#3F372F]">
                        ${hotel.price} / night
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Explore stays — only once, at the bottom */}
        <section className="mt-16 border-t border-[#D8D0C4] pt-10">
          <div className="flex justify-center">
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
        </section>
      </div>
    </main>
  )
}

export default MyBookings
