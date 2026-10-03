import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'

const CoverflowCarousel = ({
  items,
  autoplay = false,
  autoplayDelay = 4000,
  loop = false,
}) => {
  const shouldReduceMotion = useReducedMotion()

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const total = items.length

  const goTo = useCallback(
    (next) => {
      if (loop) {
        const index = ((next % total) + total) % total
        setActiveIndex(index)
        return
      }

      setActiveIndex(
        Math.min(Math.max(next, 0), total - 1)
      )
    },
    [loop, total]
  )

  useEffect(() => {
    if (
      !autoplay ||
      shouldReduceMotion ||
      isPaused ||
      total <= 1
    ) {
      return
    }

    const timer = setInterval(() => {
      goTo(activeIndex + 1)
    }, autoplayDelay)

    return () => clearInterval(timer)
  }, [
    autoplay,
    autoplayDelay,
    activeIndex,
    goTo,
    isPaused,
    shouldReduceMotion,
    total,
  ])

  if (!items.length) {
    return null
  }

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        perspective: shouldReduceMotion ? undefined : 1200,
      }}
    >

      {/* Coverflow */}
      <div className="relative mx-auto flex h-[430px] items-center justify-center overflow-hidden sm:h-[500px] lg:h-[560px]">

        {items.map((item, index) => {
          const offset = index - activeIndex
          const isActive = offset === 0

          if (Math.abs(offset) > 2) {
            return null
          }

          const rotateY = shouldReduceMotion
            ? 0
            : -offset * 38

          const translateX = offset * 230

          const translateZ = shouldReduceMotion
            ? 0
            : -Math.abs(offset) * 140

          const scale = Math.max(
            1 - Math.abs(offset) * 0.15,
            0.7
          )

          return (
            <motion.div
              key={item.id}
              animate={
                shouldReduceMotion
                  ? {
                      opacity: isActive ? 1 : 0.6,
                      x: translateX,
                    }
                  : {
                      opacity: isActive ? 1 : 0.75,
                      rotateY,
                      scale,
                      x: translateX,
                      z: translateZ,
                    }
              }
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
              }}
              className={`absolute h-[340px] w-[250px] overflow-hidden bg-[#0B0B0B] shadow-2xl sm:h-[400px] sm:w-[300px] lg:h-[460px] lg:w-[340px] ${
                isActive
                  ? 'z-30'
                  : 'z-10'
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
              onClick={() => goTo(index)}
            >

              <img
                src={item.image}
                alt={item.alt || ''}
                draggable={false}
                className="h-full w-full object-cover"
              />

              {/* Image overlay */}
              <div
                className={`absolute inset-0 transition duration-500 ${
                  isActive
                    ? 'bg-transparent'
                    : 'bg-black/35'
                }`}
              />

              {/* Active border */}
              {isActive && (
                <div className="pointer-events-none absolute inset-0 border border-[#C5A880]/60" />
              )}

            </motion.div>
          )
        })}

      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-center gap-4">

        <button
          type="button"
          disabled={!loop && activeIndex === 0}
          onClick={() => goTo(activeIndex - 1)}
          className="flex h-11 w-11 items-center justify-center border border-gray-300 text-gray-800 transition hover:border-[#C5A880] hover:bg-[#C5A880] disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous slide"
        >
          ←
        </button>

        {/* Counter */}
        <div className="flex min-w-[80px] items-center justify-center gap-3 text-xs">
          <span className="font-medium text-gray-900">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>

          <span className="h-px w-6 bg-gray-300" />

          <span className="text-gray-400">
            {String(total).padStart(2, '0')}
          </span>
        </div>

        <button
          type="button"
          disabled={!loop && activeIndex === total - 1}
          onClick={() => goTo(activeIndex + 1)}
          className="flex h-11 w-11 items-center justify-center border border-gray-300 text-gray-800 transition hover:border-[#C5A880] hover:bg-[#C5A880] disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Next slide"
        >
          →
        </button>

      </div>

      {/* Progress */}
      <div className="mt-5 flex justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to image ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-8 bg-[#C5A880]'
                : 'w-1.5 bg-gray-300'
            }`}
          />
        ))}
      </div>

    </div>
  )
}

export default CoverflowCarousel