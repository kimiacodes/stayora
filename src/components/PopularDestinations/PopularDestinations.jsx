import { Link } from 'react-router-dom'
import { destinations } from '../../data/destinations'
import ScrollReveal from '../ScrollReveal/ScrollReveal'

function PopularDestinations() {
  return (
    <section className="overflow-hidden bg-[#F5F1EA] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <ScrollReveal direction="up">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C5A880]" />

                <p className="text-[10px] uppercase tracking-[0.32em] text-[#8B7355] sm:text-xs">
                  Explore the world
                </p>
              </div>

              <h2 className="max-w-xl font-serif text-4xl leading-[1.05] text-[#0B0B0B] sm:text-5xl lg:text-6xl">
                Places worth
                <span className="block text-[#8B7355]">
                  discovering.
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <Link
              to="/hotels"
              className="group flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-[#0B0B0B] transition-colors duration-300 hover:text-[#8B7355] sm:text-xs"
            >
              <span>Explore all stays</span>

              <span className="relative flex items-center">
                <span className="h-px w-8 bg-[#0B0B0B] transition-all duration-500 group-hover:w-12 group-hover:bg-[#8B7355]" />

                
              </span>
            </Link>
          </ScrollReveal>
        </div>

        {/* Moving Cards */}
        <ScrollReveal direction="up" delay={100}>
          <div className="relative overflow-hidden">
            {/* Edge fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-[#F5F1EA] to-transparent sm:w-12" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-[#F5F1EA] to-transparent sm:w-12" />

            <div className="popular-destinations-track flex w-max gap-5 sm:gap-6">
              {destinations.map((destination, index) => (
                <DestinationCard
                  key={`first-${destination.id}`}
                  destination={destination}
                  index={index}
                />
              ))}

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
          animation: popularDestinationsMove 32s linear infinite;
        }

        .popular-destinations-track:hover {
          animation-play-state: paused;
        }

        @keyframes popularDestinationsMove {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 10px));
          }
        }

        @media (max-width: 640px) {
          .popular-destinations-track {
            animation-duration: 28s;
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
  index,
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
        w-[250px]
        shrink-0
        sm:w-[285px]
        lg:w-[310px]
      "
    >
      <article
        className="
          flex
          h-[390px]
          w-full
          flex-col
          overflow-hidden
          border
          border-[#D8CCBA]
          bg-[#0B0B0B]
          shadow-[0_20px_50px_rgba(11,11,11,0.10)]
          transition-all
          duration-700
          ease-out
          group-hover:-translate-y-2
          group-hover:border-[#C5A880]
          group-hover:shadow-[0_25px_70px_rgba(11,11,11,0.18)]
        "
      >
        {/* Image */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-1000
              ease-out
              group-hover:scale-110
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-[#0B0B0B]/70
              via-[#0B0B0B]/10
              to-transparent
              transition-all
              duration-700
              group-hover:from-[#0B0B0B]/80
            "
          />

          {/* Image top information */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
            <span
              className="
                font-serif
                text-sm
                text-white/70
                transition-colors
                duration-500
                group-hover:text-[#C5A880]
              "
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                border
                border-white/20
                bg-black/10
                backdrop-blur-sm
                transition-all
                duration-500
                group-hover:border-[#C5A880]
                group-hover:bg-[#C5A880]
              "
            >
              <span className="text-sm text-white transition-colors duration-500 group-hover:text-[#0B0B0B]">
                ↗
              </span>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex shrink-0 flex-col bg-[#0B0B0B] p-6 sm:p-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-7 bg-[#C5A880]" />

            <span className="text-[9px] uppercase tracking-[0.28em] text-white/60">
              Destination
            </span>
          </div>

          <h3
            className="
              font-serif
              text-3xl
              leading-none
              text-[#F5F1EA]
              transition-transform
              duration-500
              group-hover:-translate-y-1
            "
          >
            {destination.name}
          </h3>

          <div
            className="
              mt-5
              flex
              items-center
              gap-3
              overflow-hidden
              opacity-0
              transition-all
              duration-500
              group-hover:opacity-100
            "
          >
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/70">
              Explore stays
            </span>

            <span className="h-px w-8 bg-[#C5A880]" />
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PopularDestinations