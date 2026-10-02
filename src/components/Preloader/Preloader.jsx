import { useEffect, useState } from 'react'

function Preloader({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 1500)

    const completeTimer = setTimeout(() => {
      onComplete()
    }, 2100)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`
        fixed inset-0 z-9999
        overflow-hidden
        bg-[#0B0B0B]
        transition-opacity duration-700
        ${isExiting ? 'pointer-events-none opacity-0' : 'opacity-100'}
      `}
    >

      {/* Center content */}
      <div
        className={`
          absolute inset-0
          flex items-center justify-center
          transition-all duration-700
          ease-[cubic-bezier(0.76,0,0.24,1)]
          ${isExiting
            ? 'scale-110 opacity-0'
            : 'scale-100 opacity-100'
          }
        `}
      >

        <div className="flex flex-col items-center">

          {/* Logo */}
          <h1
            className="
              animate-preloader-logo
              font-serif
              text-4xl
              tracking-[0.25em]
              text-[#F5F1EA]
              sm:text-5xl
            "
          >
            STAYORA
          </h1>

          {/* Gold line */}
          <span
            className="
              mt-5
              h-px
              w-0
              bg-[#C5A880]
              animate-preloader-line
            "
          />

          {/* Subtitle */}
          <p
            className="
              mt-4
              text-[9px]
              uppercase
              tracking-[0.35em]
              text-[#8B7355]
              opacity-0
              animate-preloader-subtitle
            "
          >
            Extraordinary stays
          </p>

        </div>

      </div>

    </div>
  )
}

export default Preloader