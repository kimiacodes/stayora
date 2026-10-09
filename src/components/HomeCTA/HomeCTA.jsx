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
    mt-10
    inline-flex
    items-center
    justify-center
    gap-4
    border-none
    bg-[#0B0B0B]
    px-6
    py-3
    text-sm
    text-white
    shadow-[6px_6px_0_#8B7355]
    transition-all
    duration-150
    ease-in-out
    hover:shadow-[10px_10px_0_#C5A880]
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#C5A880]
    focus-visible:ring-offset-4
    focus-visible:ring-offset-[#0B0B0B]
    [transform:skewX(-15deg)]
  "
>
  <span className="[transform:skewX(15deg)]">
    Explore stays
  </span>

  <span
    className="
      flex
      w-5
      items-center
      justify-center
      transition-all
      duration-150
      group-hover:mr-3
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="
        w-5
        shrink-0
        -translate-x-3
        transition-all
        duration-150
        group-hover:translate-x-0
        group-hover:animate-[color_anim_0.6s_ease-in-out_infinite]
      "
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
</Link>



        </div>
      </ScrollReveal>

    </section>
  )
}

export default HomeCTA