
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useBooking } from '../../context/BookingContext'
import { hotels } from '../../data/hotels'

function Checkout() {
  const [searchParams] = useSearchParams()

  const { user } = useAuth()
  const {
    addBooking,
    walletBalance,
    payWithWallet,
  } = useBooking()

  const [paymentOption, setPaymentOption] = useState('online')
  const [showDemoMessage, setShowDemoMessage] = useState(false)
  const [showWalletError, setShowWalletError] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const hotelId = Number(searchParams.get('hotel'))
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guests = Number(searchParams.get('guests')) || 1

  const hotel = hotels.find((item) => item.id === hotelId)

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0
    }

    const start = new Date(`${checkIn}T00:00:00`)
    const end = new Date(`${checkOut}T00:00:00`)

    const difference = end - start

    if (difference <= 0) {
      return 0
    }

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )
  }, [checkIn, checkOut])

  const totalPrice = hotel ? nights * hotel.price : 0

  const formattedWalletBalance = Number(
    walletBalance || 0
  ).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const hasEnoughWalletBalance =
    Number(walletBalance || 0) >= totalPrice

  function handlePaymentClick() {
    if (!hotel || nights <= 0 || !user) {
      return
    }

    if (paymentOption === 'wallet') {
      setShowWalletError(false)

      if (!hasEnoughWalletBalance) {
        setShowWalletError(true)
        return
      }

      const confirmed = window.confirm(
        `Pay $${totalPrice} from your Stayora Wallet?\n\nYour wallet balance will be updated after this payment.`
      )

      if (!confirmed) {
        return
      }

      const paymentSuccessful = payWithWallet(totalPrice)

      if (!paymentSuccessful) {
        setShowWalletError(true)
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
        paymentMethod: 'wallet',
        totalPrice,
        paidAmount: totalPrice,
        paymentStatus: 'wallet',
      })

      setIsConfirmed(true)
      return
    }

    setShowWalletError(false)
    setShowDemoMessage(true)
  }

  function handleDemoPayment() {
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
      paymentMethod: 'online',
      totalPrice,
      paidAmount: totalPrice,
      paymentStatus: 'demo',
    })

    setShowDemoMessage(false)
    setIsConfirmed(true)
  }

  if (isConfirmed) {
    return (
      <main className="min-h-screen bg-[#F5F1EA] px-5 py-28 sm:px-8 lg:px-10">
        <div className="mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center">
          <div className="w-full border border-[#D8D0C4] bg-white p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C5A880]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B0B0B] text-xl text-[#C5A880]">
                ✓
              </div>
            </div>

            <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
              Reservation confirmed
            </p>

            <h1 className="mt-5 font-serif text-4xl text-[#0B0B0B] sm:text-5xl">
              Thank you, {user?.firstName}.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#77716A]">
              Your demo reservation at {hotel?.name} has been successfully created.
            </p>

            <div className="mx-auto mt-7 h-px w-12 bg-[#C5A880]" />

            <div className="mx-auto mt-7 max-w-sm border border-[#E5DED3] bg-[#FAF8F4] p-5 text-left">

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#77716A]">
                  Payment
                </span>

                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                  {paymentOption === 'wallet'
                    ? 'Wallet'
                    : 'Demo'}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between border-t border-[#E5DED3] pt-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#99928A]">
                  Paid
                </span>

                <span className="font-serif text-2xl text-[#0B0B0B]">
                  ${totalPrice}
                </span>
              </div>

            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/my-bookings"
                className="bg-[#0B0B0B] px-7 py-4 text-[10px] uppercase tracking-[0.25em] text-white transition duration-300 hover:bg-[#8B7355]"
              >
                My Bookings
              </Link>

              <Link
                to="/hotels"
                className="border border-[#D8D0C4] px-7 py-4 text-[10px] uppercase tracking-[0.25em] text-[#0B0B0B] transition duration-300 hover:border-[#8B7355] hover:bg-[#F5F1EA]"
              >
                Explore stays
              </Link>
            </div>

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
    <main className="min-h-screen bg-[#F5F1EA] px-5 pb-24 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="max-w-3xl">

          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#C5A880]" />

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
              Reservation
            </span>

            <span className="text-[10px] tracking-[0.15em] text-[#AAA39A]">
              03 / 03
            </span>
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-tight text-[#0B0B0B] sm:text-6xl">
            Complete your stay.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#77716A]">
            Review your reservation, choose your payment method,
            and complete your demo booking.
          </p>

        </header>

        {/* Main content */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-16">

          {/* LEFT */}
          <section>

            {/* Hotel */}
            <div className="border border-[#D8D0C4] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.04)] sm:p-5">

              <div className="group overflow-hidden bg-[#111111]">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                />
              </div>

              <div className="flex flex-col gap-4 border-b border-[#E5DED3] px-2 pb-6 pt-6 sm:flex-row sm:items-end sm:justify-between">

                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355]">
                    {hotel.city}, {hotel.country}
                  </p>

                  <h2 className="mt-2 font-serif text-3xl text-[#0B0B0B] sm:text-4xl">
                    {hotel.name}
                  </h2>
                </div>

                <div className="sm:text-right">
                  <span className="font-serif text-3xl text-[#0B0B0B]">
                    ${hotel.price}
                  </span>

                  <span className="ml-2 text-xs text-[#99928A]">
                    / night
                  </span>
                </div>

              </div>

              <div className="px-2 pt-6">

                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355]">
                  About the stay
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#77716A]">
                  {hotel.description}
                </p>

              </div>
            </div>

            {/* Guest */}
            <div className="mt-10">

              <div className="flex items-center gap-4">
                <span className="text-[10px] text-[#C5A880]">
                  01
                </span>

                <span className="h-px w-8 bg-[#C5A880]" />

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
                  Guest information
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="border border-[#D8D0C4] bg-white px-5 py-4">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#AAA39A]">
                    Full name
                  </p>

                  <p className="mt-2 text-sm text-[#0B0B0B]">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>

                <div className="border border-[#D8D0C4] bg-white px-5 py-4">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#AAA39A]">
                    Email
                  </p>

                  <p className="mt-2 truncate text-sm text-[#0B0B0B]">
                    {user?.email}
                  </p>
                </div>

              </div>
            </div>

            {/* Payment */}
            <div className="mt-12">

              <div className="flex items-center gap-4">
                <span className="text-[10px] text-[#C5A880]">
                  02
                </span>

                <span className="h-px w-8 bg-[#C5A880]" />

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
                  Payment
                </p>
              </div>

              <div className="mt-6 space-y-3">

                {/* Online payment */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentOption('online')
                    setShowWalletError(false)
                  }}
                  className={`
                    w-full
                    border
                    bg-white
                    p-5
                    text-left
                    transition
                    duration-300
                    ${
                      paymentOption === 'online'
                        ? 'border-[#8B7355] shadow-[0_10px_30px_rgba(0,0,0,0.04)]'
                        : 'border-[#D8D0C4] hover:border-[#B89B6D]'
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-5">

                    <div>
                      <p className="text-sm text-[#0B0B0B]">
                        Pay Online
                      </p>

                      <p className="mt-2 text-xs leading-5 text-[#77716A]">
                        Complete the payment securely through the demo checkout.
                      </p>
                    </div>

                    <div
                      className={`
                        flex
                        h-5
                        w-5
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        ${
                          paymentOption === 'online'
                            ? 'border-[#8B7355]'
                            : 'border-[#C8BBAA]'
                        }
                      `}
                    >
                      {paymentOption === 'online' && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#8B7355]" />
                      )}
                    </div>

                  </div>
                </button>

                {/* Wallet */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentOption('wallet')
                    setShowWalletError(false)
                  }}
                  className={`
                    w-full
                    border
                    bg-white
                    p-5
                    text-left
                    transition
                    duration-300
                    ${
                      paymentOption === 'wallet'
                        ? 'border-[#8B7355] shadow-[0_10px_30px_rgba(0,0,0,0.04)]'
                        : 'border-[#D8D0C4] hover:border-[#B89B6D]'
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-5">

                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-[#0B0B0B]">
                          Pay with Wallet
                        </p>

                        <span className="border border-[#D8D0C4] px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-[#8B7355]">
                          ${formattedWalletBalance}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-[#77716A]">
                        Pay the full ${totalPrice} using your Stayora wallet balance.
                      </p>
                    </div>

                    <div
                      className={`
                        flex
                        h-5
                        w-5
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        ${
                          paymentOption === 'wallet'
                            ? 'border-[#8B7355]'
                            : 'border-[#C8BBAA]'
                        }
                      `}
                    >
                      {paymentOption === 'wallet' && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#8B7355]" />
                      )}
                    </div>

                  </div>

                  {/* Insufficient balance */}
                  {paymentOption === 'wallet' &&
                    !hasEnoughWalletBalance && (
                      <div className="mt-4 border-t border-[#E5DED3] pt-4">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#9D3027]">
                          Insufficient wallet balance
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-[#77716A]">
                          You need $
                          {(
                            totalPrice -
                            Number(walletBalance || 0)
                          ).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                          more to complete this reservation.
                        </p>
                      </div>
                    )}

                  {/* Error after clicking */}
                  {showWalletError &&
                    paymentOption === 'wallet' && (
                      <div className="mt-4 border-t border-[#E5DED3] pt-4">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#9D3027]">
                          Payment unavailable
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-[#77716A]">
                          Your wallet balance is not enough to pay for this stay.
                        </p>
                      </div>
                    )}

                </button>

              </div>
            </div>
          </section>

          {/* RIGHT */}
          <aside className="h-fit lg:sticky lg:top-28">

            <div className="border border-[#D8D0C4] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-8">

              <div className="border-b border-[#E5DED3] pb-6">

                <p className="text-xs uppercase tracking-[0.2em] text-[#8B7355]">
                  Your stay
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Reservation summary
                </p>

              </div>

              {/* Dates */}
              <div className="mt-7 grid grid-cols-2 border border-[#E5DED3]">

                <div className="border-r border-[#E5DED3] p-4">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#8B7355]">
                    Check in
                  </p>

                  <p className="mt-3 text-sm text-[#0B0B0B]">
                    {checkIn}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#8B7355]">
                    Check out
                  </p>

                  <p className="mt-3 text-sm text-[#0B0B0B]">
                    {checkOut}
                  </p>
                </div>

              </div>

              {/* Details */}
              <div className="mt-6">

                <div className="flex items-center justify-between border-b border-[#E5DED3] py-4">
                  <span className="text-xs text-gray-500">
                    Guests
                  </span>

                  <span className="text-sm text-[#0B0B0B]">
                    {guests}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#E5DED3] py-4">
                  <span className="text-xs text-gray-500">
                    Duration
                  </span>

                  <span className="text-sm text-[#0B0B0B]">
                    {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#E5DED3] py-4">
                  <span className="text-xs text-gray-500">
                    Rate
                  </span>

                  <span className="text-sm text-[#0B0B0B]">
                    ${hotel.price} / night
                  </span>
                </div>

              </div>

              {/* Wallet balance */}
              <div className="mt-6 flex items-center justify-between border-b border-[#E5DED3] pb-5">
                <span className="text-xs text-gray-500">
                  Wallet balance
                </span>

                <span className="text-sm text-[#8B7355]">
                  ${formattedWalletBalance}
                </span>
              </div>

              {/* Total */}
              <div className="mt-6 border-t border-[#E5DED3] pt-6">

                <div className="flex items-end justify-between">

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                      Total today
                    </p>

                    <p className="mt-2 text-[10px] text-gray-400">
                      Full payment
                    </p>
                  </div>

                  <span className="font-serif text-3xl text-[#0B0B0B]">
                    ${totalPrice}
                  </span>

                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handlePaymentClick}
                disabled={nights <= 0 || !user}
                className="
                  group
                  relative
                  mt-8
                  w-full
                  overflow-hidden
                  bg-[#0B0B0B]
                  px-6
                  py-5
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-white
                  transition
                  duration-500
                  hover:bg-[#8B7355]
                  disabled:cursor-not-allowed
                  disabled:bg-[#D8D0C4]
                "
              >
                <span className="absolute inset-y-0 left-0 w-0 bg-white/10 transition-all duration-500 group-hover:w-full" />

                <span className="relative z-10">
                  {paymentOption === 'wallet'
                    ? 'Pay with Wallet'
                    : 'Pay & confirm'}
                </span>
              </button>

              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.15em] text-gray-400">
                Secure demo reservation
              </p>

            </div>

            {/* Demo note */}
            <div className="mt-4 border border-[#D8D0C4] bg-white/50 px-5 py-4">

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#8B7355]">
                Portfolio demo
              </p>

              <p className="mt-2 text-[10px] leading-5 text-[#77716A]">
                Stayora is not connected to a real payment gateway
                or backend server.
              </p>

            </div>

          </aside>
        </div>
      </div>

      {/* Demo payment modal */}
      {showDemoMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A09]/50 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md border border-[#D8D0C4] bg-white p-7 shadow-[0_30px_100px_rgba(0,0,0,0.18)] sm:p-9">

            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[#C5A880]" />

              <p className="text-[9px] uppercase tracking-[0.35em] text-[#8B7355]">
                Demo payment
              </p>
            </div>

            <h2 className="mt-6 font-serif text-3xl text-[#0B0B0B] sm:text-4xl">
              This is a portfolio website.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#77716A]">
              Stayora is a portfolio project and is not connected
              to a real payment gateway or server. No real payment
              will be processed.
            </p>

            <div className="mt-6 border border-[#E5DED3] bg-[#FAF8F4] p-5">

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#77716A]">
                  Amount
                </span>

                <span className="font-serif text-2xl text-[#0B0B0B]">
                  ${totalPrice}
                </span>
              </div>

              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                Demo transaction only
              </p>

            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={handleDemoPayment}
                className="flex-1 bg-[#0B0B0B] px-5 py-4 text-[10px] uppercase tracking-[0.25em] text-white transition duration-300 hover:bg-[#8B7355]"
              >
                Continue demo
              </button>

              <button
                type="button"
                onClick={() => setShowDemoMessage(false)}
                className="flex-1 border border-[#D8D0C4] px-5 py-4 text-[10px] uppercase tracking-[0.25em] text-[#0B0B0B] transition duration-300 hover:bg-[#F5F1EA]"
              >
                Go back
              </button>

            </div>
          </div>
        </div>
      )}

    </main>
  )
}

export default Checkout
