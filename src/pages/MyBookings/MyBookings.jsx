
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
      <main className="flex min-h-screen items-center justify-center bg-white px-6 py-32">
        <div className="max-w-xl text-center">

          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            My bookings
          </p>

          <h1 className="mt-5 font-serif text-5xl leading-tight text-gray-900 sm:text-6xl">
            Your next stay is waiting.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-gray-500">
            You haven't made a reservation yet. Discover our carefully
            selected stays and find somewhere special to stay.
          </p>

          <Link
            to="/hotels"
            className="mt-10 inline-block bg-gray-900 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gray-700"
          >
            Explore stays
          </Link>

        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-6 pb-24 pt-32 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <section className="border-b border-gray-200 pb-12">

          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            My bookings
          </p>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <h1 className="font-serif text-5xl leading-tight text-gray-900 sm:text-6xl">
                Your stays.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
                A collection of your reservations, all in one place.
              </p>
            </div>

            <Link
              to="/hotels"
              className="self-start text-xs uppercase tracking-[0.2em] text-gray-900 underline underline-offset-4 transition hover:text-gray-500 lg:self-auto"
            >
              Explore more stays
            </Link>

          </div>
        </section>

        {/* Bookings */}
        <div className="mt-14 space-y-16">

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
                className="border border-gray-200"
              >

                {/* Hotel */}
                <div className="grid lg:grid-cols-[1.1fr_1fr]">

                  <div className="overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="h-full min-h-80 w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-6 sm:p-8 lg:p-10">

                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      {hotel.city}, {hotel.country}
                    </p>

                    <h2 className="mt-3 font-serif text-4xl leading-tight text-gray-900">
                      {hotel.name}
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-gray-500">
                      {hotel.description}
                    </p>

                    {/* Reservation Info */}
                    <div className="mt-10 grid border-y border-gray-200 sm:grid-cols-2">

                      <div className="border-b border-gray-200 py-5 sm:border-r sm:pr-6">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                          Check in
                        </p>

                        <p className="mt-2 text-sm text-gray-900">
                          {booking.checkIn}
                        </p>
                      </div>

                      <div className="border-b border-gray-200 py-5 sm:pl-6">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                          Check out
                        </p>

                        <p className="mt-2 text-sm text-gray-900">
                          {booking.checkOut}
                        </p>
                      </div>

                      <div className="border-b border-gray-200 py-5 sm:border-b-0 sm:border-r sm:pr-6">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                          Guests
                        </p>

                        <p className="mt-2 text-sm text-gray-900">
                          {booking.guests}
                        </p>
                      </div>

                      <div className="py-5 sm:pl-6">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                          Nights
                        </p>

                        <p className="mt-2 text-sm text-gray-900">
                          {nights}
                        </p>
                      </div>

                    </div>

                    {/* Price */}
                    <div className="mt-8 flex items-end justify-between border-t border-gray-200 pt-6">

                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                          Total
                        </p>

                        <p className="mt-2 font-serif text-3xl text-gray-900">
                          ${totalPrice}
                        </p>
                      </div>

                      <p className="text-xs text-gray-500">
                        ${hotel.price} / night
                      </p>

                    </div>

                  </div>

                </div>

              </article>
            )
          })}

        </div>

      </div>
    </main>
  )
}

export default MyBookings

