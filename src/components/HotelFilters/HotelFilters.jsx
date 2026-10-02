function HotelFilters({
  destination,
  setDestination,
  setSearchParams,
  maxPrice,
  setMaxPrice,
  rating,
  setRating,
  sort,
  setSort,
}) {
  return (
    <div className="border-y border-gray-200 py-6">
      <div className="grid gap-4 md:grid-cols-4">

        {/* Destination */}
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-500">
            Destination
          </label>
         
          <input
            type="text"
            value={destination}
            onChange={(e) => {
    const value = e.target.value

    setDestination(value)

    if (value) {
      setSearchParams({ destination: value })
    } else {
      setSearchParams({})
    }
  }}
            placeholder="Where are you going?"
            className="mt-3 w-full border-b border-gray-300 bg-transparent pb-3 text-sm outline-none transition focus:border-gray-900"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-500">
            Max price
          </label>

          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Any price"
            className="mt-3 w-full border-b border-gray-300 bg-transparent pb-3 text-sm outline-none transition focus:border-gray-900"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-500">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-3 w-full border-b border-gray-300 bg-transparent pb-3 text-sm outline-none"
          >
            <option value="">Any rating</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
            <option value="4.8">4.8+</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-500">
            Sort by
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-3 w-full border-b border-gray-300 bg-transparent pb-3 text-sm outline-none"
          >
            <option value="default">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

      </div>
    </div>
  )
}

export default HotelFilters