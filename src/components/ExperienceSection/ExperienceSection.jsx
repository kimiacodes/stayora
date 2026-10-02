import { Link } from 'react-router-dom'
import ScrollReveal from '../ScrollReveal/ScrollReveal'

function ExperienceSection() {
  return (
    <section className="overflow-hidden bg-[#8B7355]">

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">

        {/* Images */}
        <ScrollReveal
          direction="right"
          className="flex h-full items-center justify-center"
        >
          <div className="grid grid-cols-3 gap-2 md:block">

            <img
              src="/images/experience.webp"
              alt="Luxury hotel experience"
              className="h-75 w-full object-cover"
            />

            <img
              src="/images/experience2.webp"
              alt="Luxury hotel experience"
              className="h-75 w-full object-cover md:hidden"
            />

            <img
              src="/images/experience3.webp"
              alt="Luxury hotel experience"
              className="h-75 w-full object-cover md:hidden"
            />

          </div>
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal
          direction="left"
          className="flex items-center"
          delay={200}
        >
          <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16 lg:py-24">

            <div className="max-w-lg">

              <p className="text-xs uppercase tracking-[0.3em] text-[#C5A880]">
                The Stayora experience
              </p>

              <h2 className="mt-6 font-serif text-2xl leading-tight text-[#F5F1EA] sm:text-3xl md:text-4xl lg:text-5xl">
                More than a place
                <span className="block italic text-[#C5A880]">
                  to sleep.
                </span>
              </h2>

              <p className="mt-8 text-base leading-8 text-[#B8AEA2]">
                From quiet mornings overlooking the sea to evenings in
                remarkable cities, Stayora helps you discover places that
                become part of your journey.
              </p>

              <Link
  to="/hotels"
  className="
    group
    relative
    inline-flex
    h-[2.9em]
    w-[8.5em]
    items-center
    justify-end
    rounded-[11px]
    border-[0.2em]
    border-[#C5A880]
    bg-transparent
    text-[#F5F1EA]
    transition-all
    duration-500
    ease-in-out
    hover:cursor-pointer
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

          </div>
        </ScrollReveal>

      </div>

    </section>
  )
}

export default ExperienceSection