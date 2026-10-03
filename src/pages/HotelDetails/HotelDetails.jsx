import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { hotels } from '../../data/hotels'
import { useState } from 'react'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'
import { useBooking } from '../../context/BookingContext'
import CoverflowCarousel from '../../components/ui/CoverflowCarousel'

function HotelDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setBooking } = useBooking()
  const today = new Date().toISOString().split('T')[0]

  const [searchParams] = useSearchParams()

  const [checkIn, setCheckIn] = useState(
    searchParams.get('checkIn') || ''
  )

  const [checkOut, setCheckOut] = useState(
    searchParams.get('checkOut') || ''
  )

  const [guests, setGuests] = useState(
    Number(searchParams.get('guests')) || 1
  )

  const hotel = hotels.find(
    (hotel) => hotel.id === Number(id)
  )

  if (!hotel) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F1EA] px-6 py-32">
        <div className="max-w-xl text-center">

          <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
            Stayora
          </p>

          <h1 className="mt-5 font-serif text-5xl text-[#0B0B0B] sm:text-6xl">
            Stay not found.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-gray-600">
            We couldn't find the stay you're looking for.
            It may have been removed or the link may be incorrect.
          </p>

          <Link
            to="/hotels"
            className="mt-10 inline-block bg-[#0B0B0B] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#8B7355]"
          >
            Explore stays
          </Link>

        </div>
      </main>
    )
  }

  let nights = 0

  if (checkIn && checkOut) {
    const start = new Date(checkIn)
    const end = new Date(checkOut)

    const difference = end - start

    nights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )
  }

  const totalPrice = nights * hotel.price

  return (
    <main className="min-h-screen bg-[#F5F1EA]">

      {/* =========================
          Gallery
      ========================== */}

      <section className="px-5 pt-20 md:px-10 lg:pt-25">
        <div className="mx-auto max-w-6xl">

          <ScrollReveal direction="up">

            <div className="relative">

              <CoverflowCarousel
                items={hotel.gallery.map((image, index) => ({
                  id: String(index),
                  image,
                  alt: `${hotel.name} ${index + 1}`,
                }))}
                loop
              />

              {/* Location */}

              <div className="pointer-events-none absolute left-6 top-6 z-40">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/80 sm:text-xs">
                  {hotel.city}, {hotel.country}
                </p>
              </div>

            </div>

          </ScrollReveal>

        </div>
      </section>


      {/* =========================
          Hotel Information + Booking
      ========================== */}

      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_380px]">

          {/* Hotel Information */}

          <ScrollReveal direction="left">

            <div className="lg:pt-4">

              <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
                {hotel.city}, {hotel.country}
              </p>

              <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] text-[#0B0B0B] sm:text-6xl lg:text-7xl">
                {hotel.name}
              </h1>

              {/* Rating / Price */}

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">

                <span className="flex items-center gap-2 text-[#8B7355]">
                  <span className="text-base">★</span>
                  <span className="font-medium text-[#0B0B0B]">
                    {hotel.rating}
                  </span>
                </span>

                <span className="h-1 w-1 rounded-full bg-[#C5A880]" />

                <span className="text-gray-600">
                  From ${hotel.price} / night
                </span>

              </div>

              {/* Description */}

              <div className="mt-12 max-w-2xl border-l border-[#C5A880] pl-6">
                <p className="text-base leading-8 text-gray-600">
                  {hotel.description}
                </p>
              </div>

              {/* Small decorative line */}

              <div className="mt-12 flex items-center gap-4">
                <span className="h-px w-12 bg-[#C5A880]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                  Stayora Collection
                </span>
              </div>

            </div>

          </ScrollReveal>


          {/* =========================
              Booking Card
          ========================== */}

          <ScrollReveal direction="right" delay={200}>

            <div className="h-fit border border-[#D8D0C4] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-8">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8B7355]">
                    Your stay
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    Reserve your experience
                  </p>
                </div>

                <div className="h-8 w-8 border border-[#C5A880] p-1">
                  <div className="h-full w-full bg-[#C5A880]" />
                </div>

              </div>


              {/* Price */}

              <div className="mt-7 border-b border-[#E5DED3] pb-7">

                <span className="font-serif text-4xl text-[#0B0B0B]">
                  ${hotel.price}
                </span>

                <span className="ml-2 text-sm text-gray-500">
                  / night
                </span>

              </div>


              {/* Check in */}

              <div className="mt-7">

                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                  Check in
                </label>

                <input
                  type="date"
                  value={checkIn}
                  min={today}
                  onChange={function handleCheckInChange(e) {
                    const value = e.target.value

                    setCheckIn(value)

                    if (checkOut && value >= checkOut) {
                      setCheckOut('')
                    }
                  }}
                  className="mt-3 w-full border-b border-[#D8D0C4] bg-transparent pb-3 text-sm text-[#0B0B0B] outline-none transition focus:border-[#8B7355]"
                />

              </div>


              {/* Check out */}

              <div className="mt-7">

                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                  Check out
                </label>

                <input
                  type="date"
                  value={checkOut}
                  min={
                    checkIn
                      ? new Date(
                          new Date(checkIn).getTime() +
                          24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .split('T')[0]
                      : today
                  }
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-3 w-full border-b border-[#D8D0C4] bg-transparent pb-3 text-sm text-[#0B0B0B] outline-none transition focus:border-[#8B7355]"
                />

              </div>


              {/* Guests */}

              <div className="mt-7">

                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                  Guests
                </label>

                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="mt-3 w-full border-b border-[#D8D0C4] bg-transparent pb-3 text-sm text-[#0B0B0B] outline-none transition focus:border-[#8B7355]"
                />

              </div>


              {/* Summary */}

              {nights > 0 && (

                <div className="mt-8 border-t border-[#E5DED3] pt-6">

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      ${hotel.price} × {nights} nights
                    </span>

                    <span className="text-[#0B0B0B]">
                      ${totalPrice}
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between">

                    <span className="text-sm uppercase tracking-[0.15em] text-gray-500">
                      Total
                    </span>

                    <span className="font-serif text-2xl text-[#0B0B0B]">
                      ${totalPrice}
                    </span>

                  </div>

                </div>

              )}


              {/* Book */}

              <button
                type="button"
                disabled={nights <= 0}
                onClick={() => {
                  navigate(
                    `/checkout?hotel=${hotel.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
                  )
                }}
                className="mt-8 w-full bg-[#0B0B0B] px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#8B7355] disabled:cursor-not-allowed disabled:bg-[#D8D0C4]"
              >
                Book this stay
              </button>

              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.15em] text-gray-400">
                Secure reservation
              </p>

            </div>

          </ScrollReveal>

        </div>
      </section>


      {/* =========================
          Amenities
      ========================== */}

      <section className="border-t border-[#D8D0C4] bg-white px-6 py-20 lg:px-10 lg:py-24">

        <ScrollReveal direction="up">

          <div className="mx-auto max-w-7xl">

            <div className="max-w-2xl">

              <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
                Amenities
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#0B0B0B] sm:text-5xl">
                Everything you need.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
                Thoughtfully selected amenities designed to make your stay
                comfortable, relaxing and memorable.
              </p>

            </div>


            {/* Amenities Grid */}

            <div className="mt-14 grid border-t border-[#E5DED3] sm:grid-cols-2 lg:grid-cols-3">

              {hotel.amenities.map((amenity, index) => (

                <div
                  key={amenity}
                  className="group flex items-center gap-5 border-b border-[#E5DED3] px-2 py-6 transition hover:bg-[#F5F1EA] sm:px-5"
                >

                  <span className="font-serif text-sm text-[#C5A880]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="text-sm text-gray-700 transition group-hover:text-[#0B0B0B]">
                    {amenity}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </ScrollReveal>
       <Link
  to="/hotels"
  className="
    group
    relative
    mt-10
    inline-flex
    h-[2.9em]
    w-[10em]
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
    Explore more stays
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

      </section>


      {/* =========================
          Bottom Accent
      ========================== */}

      

       

          

        

    </main>
  )
}

export default HotelDetails