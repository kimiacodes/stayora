
import { Link, useSearchParams } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'

function HotelCard({ hotel, delay = 0 }) {
  const [searchParams] = useSearchParams()

  const { user } = useAuth()

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist()

  const isSaved = isInWishlist(hotel.id)

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

  const handleWishlistClick = (event) => {
    event.preventDefault()
    event.stopPropagation()

    toggleWishlist(hotel)
  }

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
      <div className="flex flex-1 flex-col p-5 pt-6 sm:p-6">

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
            mt-auto
            flex
            items-end
            justify-between
            gap-4
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

          {/* Actions */}
          <div className="flex items-center gap-4">

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

            {/* Bookmark - Logged in users only */}
            {user && (
              <button
                type="button"
                onClick={handleWishlistClick}
                aria-label={
                  isSaved
                    ? `Remove ${hotel.name} from wishlist`
                    : `Save ${hotel.name} to wishlist`
                }
                className="
                  group/bookmark
                  flex
                  items-center
                  gap-2
                  text-[#0B0B0B]
                  transition-colors
                  duration-300
                  hover:text-[#8B7355]
                "
              >
                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-[#8B7355]
                    opacity-0
                    transition-all
                    duration-300
                    group-hover/bookmark:opacity-100
                    max-sm:hidden
                  "
                >
                  {isSaved ? 'Saved' : 'Save'}
                </span>

                <svg
                  viewBox="0 0 24 24"
                  fill={isSaved ? 'currentColor' : 'none'}
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    h-5
                    w-5
                    shrink-0
                    stroke-current
                    transition-all
                    duration-300
                    group-hover/bookmark:scale-110
                  "
                  strokeWidth="1.7"
                >
                  <path
                    d="M6.5 4.75A1.75 1.75 0 0 1 8.25 3h7.5a1.75 1.75 0 0 1 1.75 1.75v16.1l-5.5-3.4-5.5 3.4V4.75Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

          </div>
        </div>
      </div>
    </article>
  )
}

export default HotelCard

