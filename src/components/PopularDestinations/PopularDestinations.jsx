
import { Link } from 'react-router-dom'
import { destinations } from '../../data/destinations'
import ScrollReveal from '../ScrollReveal/ScrollReveal'

function PopularDestinations() {
  return (
    <section className="bg-[#F5F1EA] px-8 py-24 lg:px-10 lg:py-32">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <ScrollReveal>
            <div>

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C5A880]" />

                <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
                  Explore the world
                </p>
              </div>

              <h2 className="font-serif text-3xl leading-tight text-[#0B0B0B] sm:text-5xl">
                Popular destinations.
              </h2>

            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="self-end">

              <Link
                to="/hotels"
                className="group flex w-fit items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-[#0B0B0B] transition-colors duration-300 hover:text-[#8B7355] sm:text-sm"
              >
                <span>Explore all</span>

                <span className="h-px w-8 bg-[#0B0B0B] transition-all duration-300 group-hover:w-12 group-hover:bg-[#8B7355]" />
              </Link>

            </div>
          </ScrollReveal>

        </div>


        {/* Destinations */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {destinations.map((destination, index) => (

            <ScrollReveal
              key={destination.id}
              delay={index * 120}
              className="h-full"
            >

              <Link
                to={`/hotels?destination=${encodeURIComponent(destination.name)}`}
                className="group block h-full"
              >

                <div
                  className="
                    relative
                    h-90
                    w-full
                    overflow-hidden

                    border
                    border-[#D8CCBA]
                    bg-[#0B0B0B]

                    shadow-[12px_17px_51px_rgba(11,11,11,0.12)]

                    transition-all
                    duration-500
                    ease-out

                    group-hover:border-[#C5A880]
                    group-hover:shadow-[0_0_0_1px_#C5A880,0_0_30px_rgba(197,168,128,0.35)]
                  "
                >

                  {/* Image */}
                  <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden">

                    <img
                      src={destination.image}
                      alt={destination.name}
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
                        bg-linear-to-b
                        from-[#0B0B0B]/10
                        via-transparent
                        to-[#0B0B0B]/30
                      "
                    />

                  </div>


                  {/* Card Content Background */}
                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      h-[42%]
                      bg-[#D0C2AF]
                    "
                  />


                  {/* Champagne Accent */}
                  <div
                    className="
                      absolute
                      left-5
                      top-[58%]
                      h-px
                      w-10
                      bg-[#C5A880]
                      transition-all
                      duration-500
                      group-hover:w-16
                    "
                  />


                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5">

                    {/* Number */}
                    <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">
                      {String(index + 1).padStart(2, '0')}
                    </p>


                    {/* Destination Name */}
                    <h3 className="font-serif text-2xl leading-tight text-[#F5F1EA]">
                      {destination.name}
                    </h3>


                    {/* Discover */}
                    <div className="mt-4 flex items-center gap-3">

                      <span className="h-px w-7 bg-[#8B7355] transition-all duration-500 group-hover:w-12" />

                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 group-hover:text-white/80">
                        Discover
                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            </ScrollReveal>

          ))}

        </div>

      </div>

    </section>
  )
}

export default PopularDestinations
