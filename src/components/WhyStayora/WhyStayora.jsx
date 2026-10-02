import ScrollReveal from '../ScrollReveal/ScrollReveal'

const benefits = [
  {
    number: '01',
    title: 'Handpicked stays',
    description:
      'We carefully select beautiful hotels and memorable places to make your stay special.',
  },
  {
    number: '02',
    title: 'Best value',
    description:
      'Discover exceptional stays with transparent prices and no unnecessary surprises.',
  },
  {
    number: '03',
    title: 'Simple booking',
    description:
      'Search, compare and book your next stay through a simple and effortless experience.',
  },
]

function WhyStayora() {
  return (
    <section className="bg-[#F5F1EA] px-8 py-24 lg:px-10 lg:py-32">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl">

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C5A880]" />

              <p className="text-[11px] uppercase tracking-[0.35em] text-[#8B7355]">
                Why Stayora
              </p>
            </div>

            <h2 className="font-serif text-4xl leading-[1.1] text-[#0B0B0B] sm:text-5xl lg:text-6xl">
              Travel should feel
              <span className="block italic text-[#8B7355]">
                effortless.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#6F665C] sm:text-base">
              From discovering the right destination to making your reservation,
              Stayora keeps every step simple, thoughtful and memorable.
            </p>

          </div>
        </ScrollReveal>


        {/* Benefits */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">

          {benefits.map((benefit, index) => (

            <ScrollReveal
              key={benefit.number}
              delay={index * 180}
            >

              <div
                className="
                  relative
                  h-full
                  min-h-75
                  overflow-hidden
                  border
                  border-[#D8CCBA]
                  bg-[#EEE8DE]
                  p-7
                  sm:p-8
                "
              >

                {/* Top decorative line */}
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-0.5
                    w-full
                    bg-[#C5A880]
                  "
                />


                {/* Number */}
                <div className="flex items-center justify-between">

                  <span className="font-serif text-3xl text-[#C5A880]">
                    {benefit.number}
                  </span>

                  <span className="h-px w-10 bg-[#D0C2AF]" />

                </div>


                {/* Title */}
                <h3 className="mt-16 font-serif text-2xl leading-tight text-[#0B0B0B]">
                  {benefit.title}
                </h3>


                {/* Description */}
                <p className="mt-5 max-w-sm text-sm leading-7 text-[#756C62]">
                  {benefit.description}
                </p>


                

              </div>

            </ScrollReveal>

          ))}

        </div>

      </div>

    </section>
  )
}

export default WhyStayora