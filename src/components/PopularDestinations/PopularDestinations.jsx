
import { Link } from 'react-router-dom'
import { destinations } from '../../data/destinations'
import ScrollReveal from '../ScrollReveal/ScrollReveal'

function PopularDestinations() {
  return (
    <section className="overflow-hidden bg-[#F5F1EA] px-8 py-24 lg:px-10 lg:py-32">
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

        {/* Moving Cards */}
        <ScrollReveal>
          <div className="relative overflow-hidden">

            <div className="popular-destinations-track flex w-max gap-8">

              {/* First set */}
              {destinations.map((destination, index) => (
                <DestinationCard
                  key={`first-${destination.id}`}
                  destination={destination}
                  index={index}
                />
              ))}

              {/* Duplicate set for seamless loop */}
              {destinations.map((destination, index) => (
                <DestinationCard
                  key={`second-${destination.id}`}
                  destination={destination}
                  index={index}
                  ariaHidden
                />
              ))}

            </div>
          </div>
        </ScrollReveal>

      </div>

      <style>{`
        .popular-destinations-track {
          animation: popularDestinationsMove 28s linear infinite;
        }

        .popular-destinations-track:hover {
          animation-play-state: paused;
        }

        @keyframes popularDestinationsMove {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 16px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .popular-destinations-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}

function DestinationCard({
  destination,
  ariaHidden = false,
}) {
  return (
    <Link
      to={`/hotels?destination=${encodeURIComponent(destination.name)}`}
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : undefined}
      className="
        group
        block
        w-[230px]
        shrink-0
        sm:w-[260px]
        lg:w-[270px]
        xl:w-[280px]
      "
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
        <img
          src={destination.image}
          alt={destination.name}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover

            transition-transform
            duration-700
            ease-out

            group-hover:scale-105
          "
        />

        {/* Dark Gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0B0B0B]/80
            via-[#0B0B0B]/15
            to-transparent

            transition-opacity
            duration-500

            group-hover:from-[#0B0B0B]/90
          "
        />

        {/* Destination Name */}
        <div className="absolute inset-x-0 bottom-0 p-6">

          <h3
            className="
              font-serif
              text-2xl
              leading-tight
              text-[#F5F1EA]

              transition-transform
              duration-500

              group-hover:-translate-y-1
            "
          >
            {destination.name}
          </h3>

        </div>

      </div>
    </Link>
  )
}

export default PopularDestinations
