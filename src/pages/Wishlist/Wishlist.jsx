import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import HotelCard from '../../components/HotelCard/HotelCard'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'

function Wishlist() {
  const { user } = useAuth()
  const { wishlist } = useWishlist()

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#F5F1EA] px-5 pb-24 pt-32 md:px-10 lg:pt-40">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col gap-6 border-b border-[#D8D0C4] pb-8 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C5A880]" />

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] sm:text-xs">
                  Your collection
                </p>
              </div>

              <h1 className="font-serif text-4xl leading-tight text-[#0B0B0B] sm:text-5xl lg:text-6xl">
                Saved stays
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#6F665C] sm:text-base">
                Keep your favorite stays close and come back to them whenever
                you are ready to plan your next escape.
              </p>
            </div>

            {/* Count */}
            <div className="flex items-center gap-3 text-[#6F665C]">
              <span className="text-3xl font-light text-[#0B0B0B]">
                {wishlist.length}
              </span>

              <span className="text-[10px] uppercase tracking-[0.2em]">
                {wishlist.length === 1 ? 'saved stay' : 'saved stays'}
              </span>
            </div>

          </div>
        </ScrollReveal>

        {wishlist.length > 0 ? (
          <>
            {/* Saved Hotels */}
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((hotel, index) => (
                <ScrollReveal
                  key={hotel.id}
                  direction="up"
                  delay={index * 80}
                >
                  <HotelCard hotel={hotel} />
                </ScrollReveal>
              ))}
            </div>

            {/* Explore More */}
            <ScrollReveal direction="up">
              <div className="mt-20 flex justify-center">
                <Link
                  to="/hotels"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    border
                    border-[#0B0B0B]
                    bg-[#0B0B0B]
                    px-7
                    py-4
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-white
                    transition-all
                    duration-500
                    hover:border-[#C5A880]
                    hover:bg-[#C5A880]
                  "
                >
                  Explore more stays

                  <span
                    className="
                      h-px
                      w-5
                      bg-white
                      transition-all
                      duration-300
                      group-hover:w-8
                    "
                  />
                </Link>
              </div>
            </ScrollReveal>
          </>
        ) : (
          /* Empty State */
          <ScrollReveal direction="up">
            <div className="flex min-h-[420px] flex-col items-center justify-center border border-[#D8D0C4] bg-white/40 px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center border border-[#C5A880] text-[#8B7355]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M6.5 4.75A1.75 1.75 0 0 1 8.25 3h7.5a1.75 1.75 0 0 1 1.75 1.75v16.1l-5.5-3.4-5.5 3.4V4.75Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 className="mt-7 font-serif text-2xl text-[#0B0B0B] sm:text-3xl">
                Your wishlist is empty
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-[#6F665C]">
                You haven't saved any stays yet. Explore our collection and
                bookmark the places you'd love to visit.
              </p>

              
<Link
  to="/hotels"
  className="
    group
    mt-10
    inline-flex
    items-center
    justify-center
    gap-4
    border-none
    bg-[#F5F1EA]
    px-6
    py-3
    text-sm
    text-[#0B0B0B]
    shadow-[6px_6px_0_#0B0B0B]
    transition-all
    duration-150
    ease-in-out
    hover:shadow-[10px_10px_0_#C5A880]
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#C5A880]
    focus-visible:ring-offset-4
    focus-visible:ring-offset-[#F5F1EA]
    [transform:skewX(-15deg)]
  "
>
  <span className="[transform:skewX(15deg)]">
    Explore stays
  </span>

  <span
    className="
      flex
      w-5
      items-center
      justify-center
      transition-all
      duration-150
      group-hover:mr-3
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="
        w-5
        shrink-0
        -translate-x-3
        transition-all
        duration-150
        group-hover:translate-x-0
        group-hover:animate-[color_anim_0.6s_ease-in-out_infinite]
      "
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
</Link>


            </div>
          </ScrollReveal>
        )}

      </div>
    </main>
  )
}

export default Wishlist