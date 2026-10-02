import { useState } from 'react'

import HotelsHero from '../../components/HotelsHero/HotelsHero'
import HotelFilters from '../../components/HotelFilters/HotelFilters'
import HotelCard from '../../components/HotelCard/HotelCard'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'
import { useSearchParams } from 'react-router-dom'

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
    <main className="min-h-screen bg-white">

      <HotelsHero />

      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">

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

        
<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
  {filteredHotels.length === 0 ? (
    <div className="col-span-full py-20 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
        Stayora
      </p>

      <h2 className="mt-4 font-serif text-4xl text-gray-900">
        No stays found.
      </h2>

      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500">
        We couldn't find any stays matching your search or filters.
        Try changing your criteria.
      </p>
    </div>
  ) : (
    filteredHotels.map((hotel, index) => (
      <ScrollReveal
        key={hotel.id}
        delay={index * 120}
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