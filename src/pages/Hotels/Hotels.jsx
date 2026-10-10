
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import HotelFilters from '../../components/HotelFilters/HotelFilters'
import HotelCard from '../../components/HotelCard/HotelCard'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'

import { hotels } from '../../data/hotels'

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [destination, setDestination] = useState(
    searchParams.get('destination') || ''
  )
  const [maxPrice, setMaxPrice] = useState('')
  const [rating, setRating] = useState('')
  const [sort, setSort] = useState('default')

  const filteredHotels = hotels
    .filter((hotel) => {
      const searchText = destination.toLowerCase().trim()

      if (!searchText) {
        return true
      }

      return (
        hotel.city.toLowerCase().includes(searchText) ||
        hotel.country.toLowerCase().includes(searchText) ||
        hotel.name.toLowerCase().includes(searchText)
      )
    })
    .filter((hotel) => {
      if (!maxPrice) {
        return true
      }

      return hotel.price <= Number(maxPrice)
    })
    .filter((hotel) => {
      if (!rating) {
        return true
      }

      return hotel.rating >= Number(rating)
    })
    .sort((a, b) => {
      if (sort === 'price-low') {
        return a.price - b.price
      }

      if (sort === 'price-high') {
        return b.price - a.price
      }

      if (sort === 'rating') {
        return b.rating - a.rating
      }

      return 0
    })

  return (
    <main className="min-h-screen bg-[#F5F1EA]">
      <section className="relative px-6 py-28 sm:py-32 lg:px-10 lg:py-30">
        <div className="mx-auto max-w-7xl">

          {/* Hero / Section Header */}
          <ScrollReveal>
            <div className="mb-12 flex flex-col  gap-6 border-b border-[#D8CCBA] pb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-[#8B7355]" />

                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355] sm:text-xs">
                    Curated stays
                  </p>
                </div>

                <h1 className="mt-4 font-serif text-4xl leading-tight text-[#0B0B0B] sm:text-5xl lg:text-6xl">
                  Find your next
                  <span className="block italic text-[#8B7355]">
                    stay.
                  </span>
                  
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
                  Explore a collection of carefully selected stays designed
                  for memorable journeys.
                </p>
              </div>

              {/* Result Count */}
              <div className="sm:text-right">
                <p className="text-3xl font-serif text-[#0B0B0B]">
                  {filteredHotels.length}
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gray-400">
                  Available stays
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal delay={100}>
            <div className="border border-[#D8CCBA] bg-white/60 p-5 sm:p-6">
              <HotelFilters
                destination={destination}
                setDestination={setDestination}
                setSearchParams={setSearchParams}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                rating={rating}
                setRating={setRating}
                sort={sort}
                setSort={setSort}
              />
            </div>
          </ScrollReveal>

          {/* Hotels Grid */}
          <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {filteredHotels.length === 0 ? (
              <div className="col-span-full flex min-h-105 items-center justify-center border border-[#D8CCBA] bg-white/60 px-6 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
                    Stayora Collection
                  </p>

                  <h2 className="mt-4 font-serif text-4xl text-[#0B0B0B] sm:text-5xl">
                    No stays found.
                  </h2>

                  <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-500">
                    We couldn't find any stays matching your search or
                    filters. Try changing your criteria.
                  </p>
                </div>
              </div>
            ) : (
              filteredHotels.map((hotel, index) => (
                <ScrollReveal
                  key={hotel.id}
                  delay={index * 100}
                >
                  <HotelCard hotel={hotel} />
                </ScrollReveal>
              ))
            )}
          </div>

        </div>
      </section>
    </main>
  )
}

export default Hotels
