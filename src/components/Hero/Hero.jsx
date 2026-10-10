import SearchBox from "../SearchBox/SearchBox";

function Hero() {
  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#080808] sm:min-h-[680px] lg:min-h-[740px]">
      {/* Luxury Background */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/stayora-luxury-bg.png')",
        }}
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080808]/40 via-[#080808]/20 to-[#080808]/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#080808]/50 via-transparent to-[#080808]/20" />

      {/* Hero Content */}
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-5 animate-fade-up text-xs uppercase tracking-[0.3em] text-[#C5A880] sm:text-sm [animation-delay:200ms]">
            Discover extraordinary stays
          </p>

          <h1 className="animate-fade-up font-serif text-4xl leading-tight text-[#F5F1EA] sm:text-6xl lg:text-7xl [animation-delay:400ms]">
            Stay somewhere
            <span className="block italic text-[#C5A880]">
              unforgettable.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-lg sm:leading-8">
            Discover beautiful hotels, unique destinations and memorable
            experiences around the world.
          </p>

          <div className="mt-8 animate-fade-up [animation-delay:800ms]">
            <SearchBox />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;