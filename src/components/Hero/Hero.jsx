import SearchBox from "../SearchBox/SearchBox";

function Hero() {
  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#080808] sm:min-h-[680px] lg:min-h-[740px]">
      {/* Luxury Background */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-[center_65%] sm:bg-center"
        style={{
          backgroundImage: "url('/images/stayora-luxury-bg.png')",
        }}
      />

      {/* Responsive Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#080808]/25 via-[#080808]/35 to-[#080808]/75 sm:bg-gradient-to-r sm:from-[#080808]/40 sm:via-[#080808]/20 sm:to-[#080808]/10" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#080808]/30 via-transparent to-[#080808]/15" />

      {/* Hero Content */}
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-5 animate-fade-up text-xs uppercase tracking-[0.25em] text-[#C5A880] [animation-delay:200ms] sm:text-sm sm:tracking-[0.3em]">
            Discover extraordinary stays
          </p>

          <h1 className="animate-fade-up font-serif text-4xl leading-tight text-[#F5F1EA] [animation-delay:400ms] sm:text-6xl lg:text-7xl">
            Stay somewhere
            <span className="block italic text-[#C5A880]">
              unforgettable.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8">
            Discover beautiful hotels, unique destinations and memorable
            experiences around the world.
          </p>

          <div className="mt-7 animate-fade-up [animation-delay:800ms] sm:mt-8">
            <SearchBox />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;