import { Link, useParams, useSearchParams,useNavigate } from 'react-router-dom'

import { hotels } from '../../data/hotels'
import { useState } from 'react'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'
import { useBooking } from '../../context/BookingContext'


function HotelDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setBooking } = useBooking()
  const today = new Date().toISOString().split('T')[0]
const [searchParams] = useSearchParams()

const [currentImage, setCurrentImage] = useState(0)

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
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-32">
      <div className="max-w-xl text-center">

        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Stayora
        </p>

        <h1 className="mt-5 font-serif text-5xl text-gray-900 sm:text-6xl">
          Stay not found.
        </h1>

        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-gray-500">
          We couldn't find the stay you're looking for.
          It may have been removed or the link may be incorrect.
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
    <main className="min-h-screen bg-white">

      
    {/* Gallery */}
<section className="relative px-5 pt-10 lg:px-15 md:px-10">
  <div className="mx-auto max-w-full">
<ScrollReveal direction="up">
    <div className="relative overflow-hidden">

      {/* Image */}

      <div className=" h-110 sm:h-150 lg:h-175">
        <img
          src={hotel.gallery[currentImage]}
          alt={hotel.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/10" />

      {/* Previous */}

      <button
        type="button"
        onClick={() =>
          setCurrentImage(
            currentImage === 0
              ? hotel.gallery.length - 1
              : currentImage - 1
          )
        }
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-gray-900 transition hover:bg-white"
        aria-label="Previous image"
      >
        ←
      </button>

      {/* Next */}

      <button
        type="button"
        onClick={() =>
          setCurrentImage(
            currentImage === hotel.gallery.length - 1
              ? 0
              : currentImage + 1
          )
        }
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-gray-900 transition hover:bg-white"
        aria-label="Next image"
      >
        →
      </button>

      {/* Image Counter */}

      <div className="absolute bottom-5 right-5 bg-black/60 px-4 py-2 text-xs text-white">
        {currentImage + 1} / {hotel.gallery.length}
      </div>

    </div>

    

    {/* Thumbnails */}

<div className="mt-5 grid grid-cols-3 gap-3 sm:px-40 px-10  ">
  {hotel.gallery.map((image, index) => (
    <button
      key={image}
      type="button"
      onClick={() => setCurrentImage(index)}
      className={`relative h-20 overflow-hidden transition sm:h-24 ${
        currentImage === index
          ? 'ring-2 ring-gray-900 ring-offset-2'
          : 'opacity-60 hover:opacity-100'
      }`}
    >
      <img
        src={image}
        alt={`${hotel.name} ${index + 1}`}
        className="h-full w-full object-cover "
      />
    </button>
  ))}
</div>
</ScrollReveal>
  </div>
</section>

<section className="px-6 py-20 lg:px-10 lg:py-28">
  <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_380px]">

    {/* Hotel Information */}
<ScrollReveal direction="left">
    <div>

      <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
        {hotel.city}, {hotel.country}
      </p>

      <h1 className="mt-4 font-serif text-5xl leading-tight text-gray-900 sm:text-6xl">
        {hotel.name}
      </h1>

      <div className="mt-5 flex items-center gap-4 text-sm text-gray-600">
        <span>★ {hotel.rating}</span>

        <span>•</span>

        <span>
          From ${hotel.price} / night
        </span>
      </div>

      <div className="mt-10 max-w-2xl">
        <p className="text-base leading-8 text-gray-600">
          {hotel.description}
        </p>
      </div>

    </div>
    </ScrollReveal>

    {/* Booking Card */}
<ScrollReveal direction="right" delay={200}>
  <div className="h-fit border border-gray-200 p-6 sm:p-8">

    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
      Your stay
    </p>

    {/* Price */}

    <div className="mt-5">
      <span className="font-serif text-4xl text-gray-900">
        ${hotel.price}
      </span>

      <span className="ml-2 text-sm text-gray-500">
        / night
      </span>
    </div>

    {/* Check in */}

    <div className="mt-8">
      <label className="block text-xs uppercase tracking-[0.2em] text-gray-500">
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
        className="mt-3 w-full border-b border-gray-300 bg-transparent pb-3 text-sm outline-none focus:border-gray-900"
      />
    </div>

    {/* Check out */}

    <div className="mt-6">
  <label className="block text-xs uppercase tracking-[0.2em] text-gray-500">
    Check out
  </label>

  <input
    type="date"
    value={checkOut}
    min={
      checkIn
        ? new Date(
            new Date(checkIn).getTime() + 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split('T')[0]
        : today
    }
    onChange={(e) => setCheckOut(e.target.value)}
    className="mt-3 w-full border-b border-gray-300 bg-transparent pb-3 text-sm outline-none focus:border-gray-900"
  />
</div>

    {/* Guests */}

    <div className="mt-6">
      <label className="block text-xs uppercase tracking-[0.2em] text-gray-500">
        Guests
      </label>

      <input
        type="number"
        min="1"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        className="mt-3 w-full border-b border-gray-300 bg-transparent pb-3 text-sm outline-none focus:border-gray-900"
      />
    </div>

    {/* Summary */}

    {nights > 0 && (
      <div className="mt-8 border-t border-gray-200 pt-6">

        <div className="flex justify-between text-sm text-gray-600">
          <span>
            ${hotel.price} × {nights} nights
          </span>

          <span>
            ${totalPrice}
          </span>
        </div>

        <div className="mt-4 flex justify-between text-base font-medium text-gray-900">
          <span>
            Total
          </span>

          <span>
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
  className="mt-8 w-full bg-gray-900 px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
>
  Book this stay
</button>

  </div>
</ScrollReveal>

  </div>
</section>
<section className="border-t border-gray-200 px-6 py-20 lg:px-10 lg:py-24">
     <ScrollReveal direction="up">
  <div className="mx-auto max-w-7xl">

    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
      Amenities
    </p>

    <h2 className="mt-4 font-serif text-4xl text-gray-900 sm:text-5xl">
      Everything you need.
    </h2>

    <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {hotel.amenities.map((amenity) => (
        <div
          key={amenity}
          className="border-b border-gray-200 pb-5 text-sm text-gray-700"
        >
          {amenity}
        </div>
      ))}
    </div>

  </div>
  </ScrollReveal>
</section>

      

    </main>
  )
}

export default HotelDetails