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

  const getIndex = (offset) => {
    if (loop) {
      return (
        (activeIndex + offset + total) % total
      )
    }

    const index = activeIndex + offset

    if (index < 0 || index >= total) {
      return null
    }

    return index
  }

  const previousIndex = getIndex(-1)
  const nextIndex = getIndex(1)

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* =========================
          Gallery
      ========================== */}

      <div className="relative flex h-[430px] items-center justify-center overflow-hidden sm:h-[520px] lg:h-[620px]">

        {/* Previous Image */}

        {previousIndex !== null && (
          <motion.button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            initial={false}
            animate={{
              x: '-47%',
              scale: shouldReduceMotion ? 1 : 0.88,
              opacity: 0.55,
            }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 28,
            }}
            className="absolute left-1/2 z-10 hidden h-[300px] w-[220px] overflow-hidden border border-white/10 bg-[#0B0B0B] shadow-2xl sm:block sm:h-[390px] sm:w-[290px] lg:h-[470px] lg:w-[360px]"
            aria-label="Previous image"
          >
            <img
              src={items[previousIndex].image}
              alt={items[previousIndex].alt || ''}
              draggable={false}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/45" />
          </motion.button>
        )}

        {/* Next Image */}

        {nextIndex !== null && (
          <motion.button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            initial={false}
            animate={{
              x: '47%',
              scale: shouldReduceMotion ? 1 : 0.88,
              opacity: 0.55,
            }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 28,
            }}
            className="absolute left-1/2 z-10 hidden h-[300px] w-[220px] overflow-hidden border border-white/10 bg-[#0B0B0B] shadow-2xl sm:block sm:h-[390px] sm:w-[290px] lg:h-[470px] lg:w-[360px]"
            aria-label="Next image"
          >
            <img
              src={items[nextIndex].image}
              alt={items[nextIndex].alt || ''}
              draggable={false}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/45" />
          </motion.button>
        )}

        {/* Active Image */}

        <motion.div
          key={items[activeIndex].id}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.97,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-20 h-[360px] w-[calc(100%-32px)] max-w-[1050px] overflow-hidden border border-white/10 bg-[#0B0B0B] shadow-[0_30px_80px_rgba(0,0,0,0.22)] sm:h-[450px] sm:w-[78%] lg:h-[540px] lg:w-[72%]"
        >

          <img
            src={items[activeIndex].image}
            alt={items[activeIndex].alt || ''}
            draggable={false}
            className="h-full w-full object-cover"
          />

          {/* Cinematic Overlay */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

          

          {/* Image Counter */}

          <div className="pointer-events-none absolute bottom-5 right-5 sm:bottom-7 sm:right-7">

            <div className="flex items-center gap-3 text-white">

              <span className="font-serif text-2xl sm:text-3xl">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>

              <span className="h-px w-8 bg-white/40" />

              <span className="text-[10px] tracking-[0.2em] text-white/60">
                {String(total).padStart(2, '0')}
              </span>

            </div>

          </div>

        </motion.div>

      </div>


      {/* =========================
          Navigation
      ========================== */}

      <div className="mt-7 flex items-center justify-center gap-5">

        <button
          type="button"
          disabled={!loop && activeIndex === 0}
          onClick={() => goTo(activeIndex - 1)}
          className="group flex h-11 w-11 items-center justify-center border border-[#D8D0C4] bg-transparent text-[#0B0B0B] transition duration-300 hover:border-[#8B7355] hover:bg-[#C5A880] disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous slide"
        >
          <span className="text-lg transition-transform duration-300 group-hover:-translate-x-0.5">
            ←
          </span>
        </button>


        {/* Progress */}

        <div className="flex items-center gap-2">

          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to image ${index + 1}`}
              className="group flex h-4 items-center"
            >
              <span
                className={`block h-[2px] transition-all duration-500 ${
                  index === activeIndex
                    ? 'w-8 bg-[#8B7355]'
                    : 'w-2 bg-[#D8D0C4] group-hover:w-4 group-hover:bg-[#C5A880]'
                }`}
              />
            </button>
          ))}

        </div>


        <button
          type="button"
          disabled={
            !loop &&
            activeIndex === total - 1
          }
          onClick={() => goTo(activeIndex + 1)}
          className="group flex h-11 w-11 items-center justify-center border border-[#D8D0C4] bg-transparent text-[#0B0B0B] transition duration-300 hover:border-[#8B7355] hover:bg-[#C5A880] disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Next slide"
        >
          <span className="text-lg transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </button>

      </div>

    </div>
  )
}

export default CoverflowCarousel