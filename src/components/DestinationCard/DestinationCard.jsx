import { Link } from 'react-router-dom'

function DestinationCard({ destination }) {
  return (
    <Link
      to={`/hotels?destination=${destination.name.toLowerCase()}`}
      className="group relative block lg:aspect-4/2 aspect-4/3 overflow-hidden"
    >

      {/* Image */}
      <img
        src={destination.image}
        alt={destination.name}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105 "
      />

      {/* Overlay */}
      <div className=" absolute inset-0 bg-gradient-to- from-black/70 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 lg:p-6 p-2 text-white">

        <p className="sm:text-sm text-[10px] uppercase tracking-[0.2em] text-white/70">
          {destination.country}
        </p>

        <h3 className="mt-2 font-serif  lg:text-3xl sm:text-2xl  text-md">
          {destination.name}
        </h3>

      </div>

    </Link>
  )
}

export default DestinationCard