import { Link } from 'react-router-dom'
import ScrollReveal from '../ScrollReveal/ScrollReveal'

function HomeCTA() {
  return (
    <section className="bg-[#F5F1EA] px-8 py-24 lg:px-10 lg:py-32">

      <ScrollReveal>
        <div className="mx-auto max-w-5xl text-center">

          {/* Label */}
          <div className="mb-7 flex items-center justify-center gap-4">

            <span className="h-px w-10 bg-[#C5A880]" />

            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
              Your next journey
            </p>

            <span className="h-px w-10 bg-[#C5A880]" />

          </div>

          {/* Heading */}
          <h2 className="font-serif text-4xl leading-[1.05] text-[#0B0B0B] sm:text-6xl lg:text-7xl">

            Where will you

            <span className="block italic text-[#8B7355]">
              stay next?
            </span>

          </h2>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-[#756C62] sm:text-base">
            Find a place that feels right for your next adventure,
            weekend escape or unforgettable journey.
          </p>

          {/* CTA */}
          <Link
            to="/hotels"
            className="
              group
              relative
              mt-10
              inline-flex
              h-[2.9em]
              w-[8.5em]
              items-center
              justify-end
              rounded-[11px]
              border-[0.2em]
              border-[#8B7355]
              bg-transparent
              text-[#0B0B0B]
              transition-all
              duration-500
              ease-in-out
              hover:bg-[#C5A880]
              hover:text-[#0B0B0B]
            "
          >

            <span className="mr-[1.5em] text-xs">
              Explore stays
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="
                absolute
                left-[0.8em]
                w-[1.6em]
                transition-all
                duration-500
                ease-in-out
                group-hover:translate-x-5px
              "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>

          </Link>

        </div>
      </ScrollReveal>

    </section>
  )
}

export default HomeCTA