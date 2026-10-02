
import SearchBox from "../SearchBox/SearchBox";
import Velaris from "../ui/Velaris";

function Hero() {
  return (
    <section className="relative h-185 overflow-hidden">

      {/* Animated Background */}
      <Velaris
        height="740px"
        speed={1.2}
        grain={0.2}
        bg="#080808"
        colors={[
          "#8b7355",
          "#c5a880",
          "#4b4035",
          "#111111",
        ]}
        className="absolute inset-0 h-full w-full"
      />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-32 lg:px-10">

        <div className="max-w-3xl">

          <p className="mb-5 animate-fade-up text-sm uppercase tracking-[0.3em] text-white/80 [animation-delay:200ms]">
            Discover extraordinary stays
          </p>

          <h1 className="animate-fade-up font-serif text-4xl leading-tight text-white [animation-delay:400ms] sm:text-6xl lg:text-7xl">
            Stay somewhere
            <span className="block italic">
              unforgettable.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Discover beautiful hotels, unique destinations and memorable
            experiences around the world.
          </p>

          <div className="animate-fade-up [animation-delay:800ms]">
            <SearchBox />
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
