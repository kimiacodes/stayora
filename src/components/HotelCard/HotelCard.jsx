import { Link, useSearchParams } from 'react-router-dom'

function HotelCard({ hotel, delay = 0 }) {
  const [searchParams] = useSearchParams()

  const bookingParams = new URLSearchParams()

  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guests = searchParams.get('guests')

  if (checkIn) {
    bookingParams.set('checkIn', checkIn)
  }

  if (checkOut) {
    bookingParams.set('checkOut', checkOut)
  }

  if (guests) {
    bookingParams.set('guests', guests)
  }

  const detailsUrl = `/hotels/${hotel.id}${
    bookingParams.toString()
      ? `?${bookingParams.toString()}`
      : ''
  }`

  return (
    <article
  className="
    group
    relative
    mt-6
    flex
    h-108
    flex-col
    border
    border-[#D8CCBA]
    bg-[#F5F1EA]
    shadow-[0_8px_25px_rgba(11,11,11,0.06)]
    transition-all
    duration-500
    hover:-translate-y-1
    hover:border-[#C5A880]
    hover:shadow-[0_18px_40px_rgba(11,11,11,0.12)]
  "
>

      {/* Image */}
      <Link
        to={detailsUrl}
        className="
          relative
          mx-4
          -mt-6
          block
          aspect-4/3
          overflow-hidden
          shadow-[0_8px_20px_rgba(11,11,11,0.15)]
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

        {/* Image Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-linear-to-t
            from-[#0B0B0B]/30
            to-transparent
            opacity-60
            transition-opacity
            duration-500
            group-hover:opacity-80
          "
        />

        {/* Rating */}
        <div
          className="
            absolute
            right-3
            top-3
            bg-[#0B0B0B]/85
            px-3
            py-2
            text-xs
            text-[#F5F1EA]
            backdrop-blur-sm
          "
        >
          <span className="mr-1 text-[#C5A880]">
            ★
          </span>

          {hotel.rating}
        </div>

      </Link>


      {/* Information */}
      <div className="p-5 pt-6 sm:p-6">

        {/* Location */}
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] sm:text-xs">
          {hotel.city}, {hotel.country}
        </p>


        {/* Hotel Name */}
        <h3
          className="
            mt-3
            font-serif
            text-xl
            leading-tight
            text-[#0B0B0B]
            transition-colors
            duration-300
            group-hover:text-[#8B7355]
            sm:text-2xl
          "
        >
          {hotel.name}
        </h3>


        {/* Description */}
        <p className="mt-3 line-clamp-2 text-xs leading-6 text-gray-500 sm:text-sm">
          Experience an unforgettable stay in one of our handpicked destinations.
        </p>


        {/* Bottom */}
        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            border-t
            border-[#D8CCBA]
            pt-4
          "
        >

          {/* Price */}
          <p className="text-xs text-gray-500 sm:text-sm">
            From
            <span className="ml-1 font-medium text-[#0B0B0B]">
              ${hotel.price}
            </span>
            <span className="ml-1 text-xs">
              / night
            </span>
          </p>


          {/* View Stay */}
          <Link
            to={detailsUrl}
            className="
              group/link
              flex
              items-center
              gap-2
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#0B0B0B]
              transition-colors
              duration-300
              hover:text-[#8B7355]
              sm:text-xs
            "
          >
            View stay

            <span
              className="
                h-px
                w-4
                bg-[#0B0B0B]
                transition-all
                duration-300
                group-hover/link:w-7
                group-hover/link:bg-[#8B7355]
              "
            />
          </Link>

        </div>

      </div>

    </article>
  )
}

export default HotelCard