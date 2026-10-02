import { hotels } from '../../data/hotels'
import HotelCard from '../HotelCard/HotelCard'
import { Link } from 'react-router-dom'
import ScrollReveal from '../ScrollReveal/ScrollReveal'

function FeaturedStays() {
  return (
    <section className="bg-[#F5F1EA] px-8 py-24 sm:px-6 lg:px-10 lg:py-32">

      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
<div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

  <ScrollReveal>
    <div>

      {/* Label */}
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-[#C5A880]" />

        <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
          Handpicked stays
        </p>
      </div>

      {/* Heading */}
      <h2 className="font-serif text-3xl leading-tight text-[#0B0B0B] sm:text-5xl">
        Places worth staying.
      </h2>

    </div>
  </ScrollReveal>


  
  {/* View All */}
<ScrollReveal delay={150}>
  <div className="ml-auto">
    <Link
      to="/hotels"
      className="group flex w-fit items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-[#0B0B0B] transition-colors duration-300 hover:text-[#8B7355] sm:text-sm"
    >
      <span>
        View all stays
      </span>

      <span className="h-px w-8 bg-[#0B0B0B] transition-all duration-300 group-hover:w-12 group-hover:bg-[#8B7355]" />
    </Link>
  </div>
</ScrollReveal>

</div>


        {/* Hotels */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {hotels.map((hotel, index) => (
            <ScrollReveal
              key={hotel.id}
              delay={index * 150}
            >
              <HotelCard hotel={hotel} />
            </ScrollReveal>
          ))}

        </div>

      </div>

    </section>
  )
}

export default FeaturedStays