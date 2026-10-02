
import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useBooking } from '../../context/BookingContext'
import { hotels } from '../../data/hotels'

function Checkout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { user } = useAuth()
  const { addBooking } = useBooking()

  const [isConfirmed, setIsConfirmed] = useState(false)

  const hotelId = Number(searchParams.get('hotel'))
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guests = Number(searchParams.get('guests')) || 1

  const hotel = hotels.find((hotel) => hotel.id === hotelId)

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0
    }

    const start = new Date(checkIn)
    const end = new Date(checkOut)

    const difference = end - start

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )
  }, [checkIn, checkOut])

  const totalPrice = hotel
    ? nights * hotel.price
    : 0

  function handleConfirm() {
    if (!hotel || nights <= 0 || !user) {
      return
    }

    addBooking({
      hotelId,
      checkIn,
      checkOut,
      guests,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    })

    setIsConfirmed(true)
  }

  if (isConfirmed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-32">
        <div className="max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Reservation confirmed
          </p>

          <h1 className="mt-4 font-serif text-5xl text-gray-900">
            Thank you, {user?.firstName}.
          </h1>

          <p className="mt-6 text-sm leading-7 text-gray-500">
            Your reservation at {hotel?.name} has been confirmed.
            We look forward to welcoming you.
          </p>

          <Link
            to="/my-bookings"
            className="mt-8 inline-block bg-gray-900 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gray-700"
          >
            Explore more stays
          </Link>
        </div>
      </main>
    )
  }

  if (!hotel) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-32">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Checkout
          </p>

          <h1 className="mt-4 font-serif text-4xl text-gray-900">
            Reservation not found.
          </h1>

          <Link
            to="/hotels"
            className="mt-8 inline-block text-xs uppercase tracking-[0.2em] text-gray-900 underline underline-offset-4"
          >
            Explore stays
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-6 pb-20 pt-32 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Checkout
          </p>

          <h1 className="mt-4 font-serif text-5xl text-gray-900 sm:text-6xl">
            Review your stay.
          </h1>

          <p className="mt-6 text-sm leading-7 text-gray-500">
            Review your reservation details before confirming your stay.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_420px]">
          <section>
            <img
              src={hotel.image}
              alt={hotel.name}
              className="aspect-4/3 w-full object-cover"
            />

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {hotel.city}, {hotel.country}
              </p>

              <h2 className="mt-3 font-serif text-4xl text-gray-900">
                {hotel.name}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500">
                {hotel.description}
              </p>
            </div>
          </section>

          <aside className="h-fit border border-gray-200 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Reservation details
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex justify-between border-b border-gray-200 pb-4 text-sm">
                <span className="text-gray-500">
                  Guest
                </span>

                <span className="text-right text-gray-900">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-4 text-sm">
                <span className="text-gray-500">
                  Check in
                </span>

                <span className="text-gray-900">
                  {checkIn}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-4 text-sm">
                <span className="text-gray-500">
                  Check out
                </span>

                <span className="text-gray-900">
                  {checkOut}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-4 text-sm">
                <span className="text-gray-500">
                  Guests
                </span>

                <span className="text-gray-900">
                  {guests}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-4 text-sm">
                <span className="text-gray-500">
                  Nights
                </span>

                <span className="text-gray-900">
                  {nights}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Price / night
                </span>

                <span className="text-gray-900">
                  ${hotel.price}
                </span>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-lg font-medium text-gray-900">
                <span>Total</span>

                <span>${totalPrice}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={nights <= 0 || !user}
              className="mt-8 w-full bg-gray-900 px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirm booking
            </button>
          </aside>
        </div>
      </div>
    </main>
  )
}
export default Checkout


