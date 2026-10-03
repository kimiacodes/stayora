import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'motion/react'

function FramerCarousel({ images, hotelName }) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef(null)

  const x = useMotionValue(0)

  useEffect(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth || 1

    animate(x, -index * containerWidth, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    })
  }, [index, x])

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-[#0B0B0B]"
      >

        {/* Slides */}
        <motion.div
          className="flex"
          style={{ x }}
        >
          {images.map((image, imageIndex) => (
            <div
              key={image}
              className="h-[420px] w-full shrink-0 sm:h-[560px] lg:h-[680px]"
            >
              <img
                src={image}
                alt={`${hotelName} ${imageIndex + 1}`}
                className="h-full w-full select-none object-cover"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        {/* Previous */}
        <motion.button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          whileHover={index !== 0 ? { scale: 1.08 } : {}}
          whileTap={index !== 0 ? { scale: 0.95 } : {}}
          className={`absolute left-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 backdrop-blur-sm transition ${
            index === 0
              ? 'cursor-not-allowed bg-black/20 text-white/30'
              : 'bg-black/25 text-white hover:bg-white hover:text-black'
          }`}
          aria-label="Previous image"
        >
          ←
        </motion.button>

        {/* Next */}
        <motion.button
          type="button"
          disabled={index === images.length - 1}
          onClick={() =>
            setIndex((i) => Math.min(images.length - 1, i + 1))
          }
          whileHover={
            index !== images.length - 1 ? { scale: 1.08 } : {}
          }
          whileTap={
            index !== images.length - 1 ? { scale: 0.95 } : {}
          }
          className={`absolute right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 backdrop-blur-sm transition ${
            index === images.length - 1
              ? 'cursor-not-allowed bg-black/20 text-white/30'
              : 'bg-black/25 text-white hover:bg-white hover:text-black'
          }`}
          aria-label="Next image"
        >
          →
        </motion.button>

        {/* Counter */}
        <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3 text-white">
          <span className="text-sm">
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="h-px w-8 bg-white/50" />

          <span className="text-xs text-white/60">
            {String(images.length).padStart(2, '0')}
          </span>
        </div>

        {/* Progress */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, imageIndex) => (
            <button
              key={imageIndex}
              type="button"
              onClick={() => setIndex(imageIndex)}
              aria-label={`Go to image ${imageIndex + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                imageIndex === index
                  ? 'w-8 bg-[#C5A880]'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {images.map((image, imageIndex) => (
          <button
            key={image}
            type="button"
            onClick={() => setIndex(imageIndex)}
            className={`relative h-20 w-28 shrink-0 overflow-hidden transition duration-300 sm:h-24 sm:w-36 ${
              imageIndex === index
                ? 'ring-2 ring-[#C5A880] ring-offset-2'
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            <img
              src={image}
              alt={`${hotelName} ${imageIndex + 1}`}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />

            {imageIndex === index && (
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#C5A880]" />
            )}
          </button>
        ))}
      </div>

    </div>
  )
}

export default FramerCarousel