import { useState } from 'react'
import { Link } from 'react-router-dom'

import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'
import { hotels } from '../../data/hotels'

function Destinations() {
  const [sort, setSort] = useState('default')

  const destinations = hotels.reduce(
    (accumulator, hotel) => {
      const existingDestination = accumulator.find(
        (destination) =>
          destination.city === hotel.city &&
          destination.country === hotel.country
      )

      if (existingDestination) {
        existingDestination.hotelCount += 1

        return accumulator
      }

      accumulator.push({
        city: hotel.city,
        country: hotel.country,
        image: hotel.image,
        hotelCount: 1,
      })

      return accumulator
    },
    []
  )

  const sortedDestinations = [...destinations].sort(
    (a, b) => {
      if (sort === 'most-stays') {
        return b.hotelCount - a.hotelCount
      }

      if (sort === 'a-z') {
        return a.city.localeCompare(b.city)
      }

      if (sort === 'z-a') {
        return b.city.localeCompare(a.city)
      }

      return 0
    }
  )

  return (
    <main className="min-h-screen bg-[#F5F1EA]">

      {/* Hero */}
      <section className="relative px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

        <div className="mx-auto max-w-7xl">

          {/* Section Header */}
          <ScrollReveal>

            <div className="mb-12 flex flex-col gap-6 border-b border-[#D8CCBA] pb-10 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <div className="flex items-center gap-4">

                  <span className="h-px w-8 bg-[#8B7355]" />

                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355] sm:text-xs">
                    Explore the world
                  </p>

                </div>

                <h1 className="mt-4 font-serif text-4xl leading-tight text-[#0B0B0B] sm:text-5xl lg:text-6xl">
                  Discover your next
                  <span className="block italic">
                    destination.
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
                  Explore destinations chosen for unforgettable stays,
                  beautiful surroundings, and memorable journeys.
                </p>

              </div>

              {/* Result Count */}
              <div className="sm:text-right">

                <p className="text-3xl font-serif text-[#0B0B0B]">
                  {sortedDestinations.length}
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gray-400">
                  Destinations
                </p>

              </div>

            </div>

          </ScrollReveal>


          {/* Sort */}
          <ScrollReveal delay={100}>

            <div className="border border-[#D8CCBA] bg-white/60 p-5 sm:p-6">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
                    Discover
                  </p>

                  <p className="mt-2 text-sm text-[#0B0B0B]">
                    Browse our curated destinations.
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <label
                    htmlFor="destination-sort"
                    className="text-[10px] uppercase tracking-[0.2em] text-gray-400"
                  >
                    Sort by
                  </label>

                  <div className="relative">

                    <select
                      id="destination-sort"
                      value={sort}
                      onChange={(event) =>
                        setSort(event.target.value)
                      }
                      className="
                        min-w-44
                        appearance-none
                        border
                        border-[#D8CCBA]
                        bg-[#F5F1EA]
                        px-4
                        py-3
                        pr-10
                        text-xs
                        text-[#0B0B0B]
                        outline-none
                        transition-colors
                        duration-300
                        hover:border-[#C5A880]
                        focus:border-[#8B7355]
                      "
                    >
                      <option value="default">
                        Featured
                      </option>

                      <option value="most-stays">
                        Most stays
                      </option>

                      <option value="a-z">
                        A–Z
                      </option>

                      <option value="z-a">
                        Z–A
                      </option>
                    </select>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="
                        pointer-events-none
                        absolute
                        right-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-[#8B7355]
                      "
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                  </div>

                </div>

              </div>

            </div>

          </ScrollReveal>


          {/* Destinations Grid */}
          <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">

            {sortedDestinations.length === 0 ? (

              <div className="col-span-full flex min-h-105 items-center justify-center border border-[#D8CCBA] bg-white/60 px-6 text-center">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
                    Stayora Collection
                  </p>

                  <h2 className="mt-4 font-serif text-4xl text-[#0B0B0B] sm:text-5xl">
                    No destinations found.
                  </h2>

                  <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-500">
                    We couldn't find any destinations to display right now.
                  </p>

                </div>

              </div>

            ) : (

              sortedDestinations.map(
                (destination, index) => (

                  <ScrollReveal
                    key={`${destination.city}-${destination.country}`}
                    delay={index * 100}
                  >

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
                        to={`/hotels?destination=${encodeURIComponent(
                          destination.city
                        )}`}
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
                          src={destination.image}
                          alt={`${destination.city}, ${destination.country}`}
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

                      </Link>


                      {/* Information */}
                      <div className="flex flex-1 flex-col p-5 pt-6 sm:p-6">

                        {/* Country */}
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] sm:text-xs">
                          {destination.country}
                        </p>


                        {/* City */}
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
                          {destination.city}
                        </h3>


                        {/* Description */}
                        <p className="mt-3 line-clamp-2 text-xs leading-6 text-gray-500 sm:text-sm">
                          Discover carefully selected stays and memorable
                          experiences in {destination.city}.
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

                          {/* Stay Count */}
                          <p className="text-xs text-gray-500 sm:text-sm">

                            <span className="font-medium text-[#0B0B0B]">
                              {destination.hotelCount}
                            </span>

                            <span className="ml-1">
                              {destination.hotelCount === 1
                                ? 'stay'
                                : 'stays'}
                            </span>

                          </p>


                          {/* View Stays */}
                          <Link
                            to={`/hotels?destination=${encodeURIComponent(
                              destination.city
                            )}`}
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
                            View stays

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

                  </ScrollReveal>

                )
              )

            )}

          </div>

        </div>

      </section>

    </main>
  )
}

export default Destinations