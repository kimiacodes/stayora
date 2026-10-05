
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useBooking } from '../../context/BookingContext'
import { hotels } from '../../data/hotels'

function Checkout() {
  const [searchParams] = useSearchParams()

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
      <main className="relative min-h-screen overflow-hidden bg-[#F5F1EA] px-5 py-32 sm:px-8">
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#C5A880]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#8B7355]/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center">
          <div className="w-full border border-[#C5A880]/50 bg-[#F8F5F0]/80 px-6 py-12 text-center shadow-[0_30px_80px_rgba(60,45,30,0.08)] backdrop-blur-xl sm:px-14 sm:py-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C5A880]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#111111] text-xl text-[#C5A880]">
                ✓
              </div>
            </div>

            <p className="mt-9 text-[10px] font-medium uppercase tracking-[0.4em] text-[#8B7355]">
              Reservation confirmed
            </p>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-[#111111] sm:text-5xl">
              Thank you, {user?.firstName}.
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#77716A]">
              Your stay at {hotel?.name} has been successfully
              confirmed. We look forward to welcoming you.
            </p>
             <Link
  to="/my-bookings"
  className="mt-8 inline-flex items-center gap-3  px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-[#8B7355] transition duration-300  hover:text-[#111111]"
>
  My Bookings
  
</Link>

            <div className="mx-auto mt-8 h-px w-16 bg-[#C5A880]" />
           

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
        </div>
      </main>
    )
  }

  if (!hotel) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F1EA] px-6 py-32">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
            Checkout
          </p>

          <h1 className="mt-5 font-serif text-4xl text-[#111111] sm:text-5xl">
            Reservation not found.
          </h1>

          <Link
            to="/hotels"
            className="mt-8 inline-block text-[10px] uppercase tracking-[0.25em] text-[#8B7355] underline underline-offset-8 transition hover:text-[#111111]"
          >
            Explore stays
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F1EA] px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-48 top-40 h-[500px] w-[500px] rounded-full bg-[#C5A880]/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-48 top-[45%] h-[500px] w-[500px] rounded-full bg-[#8B7355]/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Page heading */}
        <header className="max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-[#C5A880]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#8B7355]">
              Reservation
            </span>

            <span className="text-[10px] tracking-[0.2em] text-[#AAA39A]">
              03 / 03
            </span>
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-tight text-[#111111] sm:text-6xl lg:text-7xl">
            Complete your stay.
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-[#77716A]">
            One final review before your reservation is confirmed.
            Please make sure all details are correct.
          </p>
        </header>

        {/* Content */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] xl:mt-16 xl:gap-16">
          {/* LEFT */}
          <section>
            {/* Hotel image */}
            <div className="group relative overflow-hidden bg-[#111111]">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="aspect-[16/10] w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                  {hotel.city}, {hotel.country}
                </p>

                <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                  {hotel.name}
                </h2>
              </div>

              
            </div>

            {/* Hotel information */}
            <div className="mt-9 grid gap-8 border-b border-[#D8D0C4] pb-10 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  About the stay
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#77716A]">
                  {hotel.description}
                </p>
              </div>

              <div className="flex gap-8 sm:border-l sm:border-[#D8D0C4] sm:pl-8">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#AAA39A]">
                    From
                  </p>

                  <p className="mt-2 font-serif text-2xl text-[#111111]">
                    ${hotel.price}
                  </p>

                  <p className="mt-1 text-[10px] text-[#99928A]">
                    per night
                  </p>
                </div>
              </div>
            </div>

            {/* Guest information */}
            <div className="mt-10">
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-[#C5A880]">
                  01
                </span>

                <span className="h-px w-8 bg-[#C5A880]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  Guest information
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="border border-[#D8D0C4] bg-white/35 px-5 py-4">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#AAA39A]">
                    Full name
                  </p>

                  <p className="mt-2 text-sm text-[#111111]">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>

                <div className="border border-[#D8D0C4] bg-white/35 px-5 py-4">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#AAA39A]">
                    Email
                  </p>

                  <p className="mt-2 truncate text-sm text-[#111111]">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT — SUMMARY */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="relative overflow-hidden border border-[#C5A880]/60 bg-[#111111] text-white shadow-[0_25px_70px_rgba(20,15,10,0.14)]">
              {/* Card accent */}
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C5A880]/20" />
              <div className="absolute right-8 top-8 h-16 w-16 rounded-full border border-[#C5A880]/10" />

              <div className="relative p-6 sm:p-8">
                <div className="flex items-start justify-between border-b border-white/10 pb-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-[#C5A880]">
                      Reservation summary
                    </p>

                    <h3 className="mt-3 font-serif text-2xl">
                      Your stay
                    </h3>
                  </div>

                  <span className="font-serif text-2xl text-[#C5A880]">
                    ✦
                  </span>
                </div>

                {/* Dates */}
                <div className="mt-7 grid grid-cols-2 border border-white/10">
                  <div className="border-r border-white/10 p-4">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                      Check in
                    </p>

                    <p className="mt-3 text-sm text-white">
                      {checkIn}
                    </p>
                  </div>

                  <div className="p-4">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                      Check out
                    </p>

                    <p className="mt-3 text-sm text-white">
                      {checkOut}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-7 space-y-0">
                  <div className="flex items-center justify-between border-b border-white/10 py-4">
                    <span className="text-xs text-white/45">
                      Guest
                    </span>

                    <span className="text-right text-xs text-white">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 py-4">
                    <span className="text-xs text-white/45">
                      Guests
                    </span>

                    <span className="text-xs text-white">
                      {guests}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 py-4">
                    <span className="text-xs text-white/45">
                      Duration
                    </span>

                    <span className="text-xs text-white">
                      {nights} {nights === 1 ? 'night' : 'nights'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <span className="text-xs text-white/45">
                      Rate
                    </span>

                    <span className="text-xs text-white">
                      ${hotel.price} / night
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-4 border-t border-[#C5A880]/40 pt-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880]">
                        Total stay
                      </p>

                      <p className="mt-2 text-[10px] text-white/35">
                        {nights} nights · {guests} guests
                      </p>
                    </div>

                    <p className="font-serif text-3xl text-white">
                      ${totalPrice}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={nights <= 0 || !user}
                  className="group relative mt-8 w-full overflow-hidden bg-[#C5A880] px-6 py-5 text-[10px] font-medium uppercase tracking-[0.3em] text-[#111111] transition duration-500 hover:bg-[#D5BC99] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="absolute inset-y-0 left-0 w-0 bg-white/20 transition-all duration-500 group-hover:w-full" />

                  <span className="relative z-10">
                    Confirm reservation
                  </span>
                </button>

                <p className="mt-5 text-center text-[9px] leading-5 text-white/30">
                  Your reservation will be securely saved
                  to your Stayora account.
                </p>
              </div>
            </div>

            {/* Secure note */}
            <div className="mt-4 flex items-center gap-3 border border-[#D8D0C4] bg-white/30 px-5 py-4">
              <span className="text-[#8B7355]">◈</span>

              <p className="text-[10px] leading-5 text-[#77716A]">
                Reservation details are linked to your account
                and available in My Bookings.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Checkout

