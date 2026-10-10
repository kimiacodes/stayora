import SearchBox from "../SearchBox/SearchBox";
import Velaris from "../ui/Velaris";

const HERO_COLORS = [
  "#8b7355",
  "#c5a880",
  "#4b4035",
  "#111111",
];

function Hero() {
  return (
    <section className="relative isolate min-h-[740px] overflow-hidden bg-[#080808]">
      <Velaris
        height="100%"
        speed={1.2}
        grain={0.2}
        bg="#080808"
        colors={HERO_COLORS}
        className="absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto flex min-h-[740px] w-full max-w-7xl items-center px-6 py-24 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-5 animate-fade-up text-sm uppercase tracking-[0.3em] text-white/80 [animation-delay:200ms]">
            Discover extraordinary stays
          </p>

          <h1 className="animate-fade-up font-serif text-4xl leading-tight text-white [animation-delay:400ms] sm:text-6xl lg:text-7xl">
            Stay somewhere
            <span className="block italic">unforgettable.</span>
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