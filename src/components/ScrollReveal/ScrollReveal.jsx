import { useEffect, useRef, useState } from 'react'

function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const hiddenPosition = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10',
  }

  return (
    <div
      ref={elementRef}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : `${hiddenPosition[direction]} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default ScrollReveal