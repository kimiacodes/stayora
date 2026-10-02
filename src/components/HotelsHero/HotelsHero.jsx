import ScrollReveal from '../ScrollReveal/ScrollReveal'
import Velaris from '../ui/Velaris'

function HotelsHero() {
  return (
    <section className="relative min-h-170 overflow-hidden bg-[#080808] sm:min-h-180">

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Velaris
          height="720px"
          speed={0.75}
          grain={0.18}
          bg="#080808"
          colors={[
            "#8b7355",
            "#c5a880",
            "#3f352b",
            "#111111",
          ]}
          className="h-full w-full"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-[#080808]/95 via-[#080808]/45 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto flex min-h-170 w-full max-w-7xl items-center px-6 py-28 lg:min-h-180 lg:px-10">

        <ScrollReveal>
          <div className="max-w-3xl">

            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-[#C5A880]" />

              <p className="text-[10px] uppercase tracking-[0.4em] text-[#C5A880] sm:text-xs">
                Stayora Collection
              </p>
            </div>

            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-[#F5F1EA] sm:text-7xl lg:text-[92px]">
              Find a place
              <span className="mt-2 block italic text-[#C5A880]">
                worth staying.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
              From quiet escapes to extraordinary city stays,
              discover places designed to make every journey memorable.
            </p>

          </div>
        </ScrollReveal>

      </div>

     

    </section>
  )
}

export default HotelsHero