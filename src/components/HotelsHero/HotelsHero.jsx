import ScrollReveal from '../ScrollReveal/ScrollReveal'


function HotelsHero() {
  return (
    
    <section className="relative flex min-h-105 items-end overflow-hidden sm:min-h-125">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hotels-hero.webp')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-36 lg:px-10 lg:pb-20">

        <ScrollReveal>

          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Discover your next stay
          </p>

          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
            Places worth
            <span className="block italic">
              staying.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Discover beautiful hotels, unique stays and unforgettable
            places around the world.
          </p>

        </ScrollReveal>

      </div>

    </section>
  )
}

export default HotelsHero