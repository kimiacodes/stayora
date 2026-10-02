
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
  const navigate = useNavigate()

  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  // تاریخ امروز به فرمت YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0]

  function handleCheckInChange(e) {
    const value = e.target.value

    setCheckIn(value)

    // اگر تاریخ خروج قبل از ورود باشد، آن را پاک می‌کنیم
    if (checkOut && value >= checkOut) {
      setCheckOut('')
    }
  }

  function handleSearch(e) {
    e.preventDefault()

    const params = new URLSearchParams()

    if (destination.trim()) {
      params.set('destination', destination.trim())
    }

    if (checkIn) {
      params.set('checkIn', checkIn)
    }

    if (checkOut) {
      params.set('checkOut', checkOut)
    }

    params.set('guests', guests)

    navigate(`/hotels?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mt-12 w-full max-w-5xl "
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch ">

        {/* Search Fields */}
        <div className="grid flex-1 grid-cols-2 overflow-hidden rounded-sm bg-white shadow-2xl md:grid-cols-4 ">

          {/* Destination */}
          <div className="border-b border-gray-200 p-4 sm:p-5 md:border-b-0 md:border-r">
            <label className="block md:text-xs text-[11px] uppercase tracking-wider text-gray-500">
              Destination
            </label>

            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where are you going?"
              className="mt-2 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
           {/* Guests */}
          <div className="p-4 sm:p-5 border-b border-gray-200 md:border-b-0 md:border-r">
            <label className="block md:text-xs text-[11px] uppercase tracking-wider text-gray-500">
              Guests
            </label>

            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-2 w-full bg-transparent text-sm text-gray-900 outline-none"
            />
          </div>

          {/* Check in */}
          <div className="border-b border-gray-200 p-4 sm:p-5 md:border-b-0 md:border-r">
            <label className="block md:text-xs text-[11px] uppercase tracking-wider text-gray-500">
              Check in
            </label>

            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={handleCheckInChange}
              className="mt-2 w-full bg-transparent text-sm text-gray-900 outline-none"
            />
          </div>

          {/* Check out */}
          <div className="border-b border-gray-200 p-4 sm:p-5 md:border-b-0 md:border-r">
            <label className="block md:text-xs text-[11px] uppercase tracking-wider text-gray-500">
              Check out
            </label>

            <input
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="mt-2 w-full bg-transparent text-sm text-gray-900 outline-none"
            />
          </div>

         

        </div>

        {/* Search Button */}
        <button
  type="submit"
  className="
    group
    relative
    cursor-pointer
    overflow-hidden
    rounded-lg
    border-solid
    bg-[#0B0B0B]
    px-8
    py-5
    text-center
    text-sm
    uppercase
    tracking-[0.2em]
    text-white
    outline-offset-4
    transition-transform
    duration-300
    ease-in-out
    
    focus:outline-2
    focus:outline-white
    focus:outline-offset-4
  "
>
  <span className="relative z-20">
    Search
  </span>

  {/* Shine Effect */}
  <span
    className="
      absolute
      left-[-75%]
      top-0
      z-10
      h-full
      w-[50%]
      rotate-12
      bg-white/20
      blur-lg
      transition-all
      duration-1000
      ease-in-out
      group-hover:left-[125%]
    "
  />

  {/* Top Left */}
  <span
    className="
      absolute
      left-0
      top-0
      z-10
      block
      h-[20%]
      w-1/2
      rounded-tl-lg
      border-l-2
      border-t-2
      border-[#C5A880]
      transition-all
      duration-300
    "
  />

  {/* Top Right */}
  <span
    className="
      absolute
      right-0
      top-0
      z-10
      block
      h-[60%]
      w-1/2
      rounded-tr-lg
      border-r-2
      border-t-2
      border-[#C5A880]
      transition-all
      duration-300
      group-hover:h-[90%]
    "
  />

  {/* Bottom Left */}
  <span
    className="
      absolute
      bottom-0
      left-0
      z-10
      block
      h-[60%]
      w-1/2
      rounded-bl-lg
      border-b-2
      border-l-2
      border-[#C5A880]
      transition-all
      duration-300
      group-hover:h-[90%]
    "
  />

  {/* Bottom Right */}
  <span
    className="
      absolute
      bottom-0
      right-0
      z-10
      block
      h-[20%]
      w-1/2
      rounded-br-lg
      border-b-2
      border-r-2
      border-[#C5A880]
      transition-all
      duration-300
    "
  />
</button>

      </div>
    </form>
  )
}

export default SearchBox

