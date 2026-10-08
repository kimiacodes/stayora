import { Link } from 'react-router-dom'
import ScrollReveal from '../ScrollReveal/ScrollReveal'

function Footer() {
  return (
    <footer className="bg-[#0B0B0B] text-[#F5F1EA]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">

        {/* Top */}
        <ScrollReveal>
          <div className="grid gap-14 border-b border-[#8B7355]/20 pb-16 md:grid-cols-4">

            {/* Brand */}
            <div className="md:col-span-2">
              <Link
                to="/"
                className="
                  inline-block
                  font-serif
                  text-3xl
                  tracking-[0.2em]
                  transition-colors
                  duration-300
                  hover:text-[#C5A880]
                "
              >
                STAYORA
              </Link>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C5A880]" />

                <span className="text-[9px] uppercase tracking-[0.3em] text-[#8B7355]">
                  Extraordinary stays
                </span>
              </div>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#9F968C]">
                Discover beautiful stays, remarkable destinations and
                experiences worth remembering.
              </p>
            </div>

            {/* Navigation Columns */}
            <div className="grid grid-cols-2 gap-10 md:contents">

              {/* Explore */}
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">
                  Explore
                </h3>

                <div className="mt-7 flex flex-col gap-4">
                  <Link
                    to="/hotels"
                    className="w-fit text-sm text-[#B8AEA2] transition-colors duration-300 hover:text-[#C5A880]"
                  >
                    Stays
                  </Link>

                  <Link
                    to="/destinations"
                    className="w-fit text-sm text-[#B8AEA2] transition-colors duration-300 hover:text-[#C5A880]"
                  >
                    Destinations
                  </Link>

                  <Link
                    to="/experiences"
                    className="w-fit text-sm text-[#B8AEA2] transition-colors duration-300 hover:text-[#C5A880]"
                  >
                    Experiences
                  </Link>
                </div>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">
                  Company
                </h3>

                <div className="mt-7 flex flex-col gap-4">
                  <Link
                    to="/About"
                    className="w-fit text-sm text-[#B8AEA2] transition-colors duration-300 hover:text-[#C5A880]"
                  >
                    About
                  </Link>

                  <Link
                    to="/contact"
                    className="w-fit text-sm text-[#B8AEA2] transition-colors duration-300 hover:text-[#C5A880]"
                  >
                    Contact
                  </Link>

                  <Link
                    to="/login"
                    className="w-fit text-sm text-[#B8AEA2] transition-colors duration-300 hover:text-[#C5A880]"
                  >
                    Sign in
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* Bottom */}
        <ScrollReveal delay={200}>
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              pt-7
              sm:gap-6
            "
          >
            {/* Copyright */}
            <p className="shrink-0 text-[8px] uppercase tracking-[0.12em] text-[#756C62] sm:text-[10px] sm:tracking-[0.15em]">
              © 2026 Stayora. All rights reserved.
            </p>

            {/* Social Card */}
            <div
              className="
                flex
                shrink-0
                items-center
                gap-1
                rounded-[13px]
                border
                border-[#C5A880]/20
                bg-white/2
                p-1.5
                shadow-[inset_0_0_20px_rgba(255,255,255,0.04),0_5px_15px_rgba(0,0,0,0.15)]
                backdrop-blur-[15px]
                transition-all
                duration-500
                hover:bg-white/5
                sm:gap-2
                sm:rounded-[15px]
                sm:p-2
              "
            >

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="
                  group
                  relative
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-[#C5A880]
                  shadow-[inset_0_0_15px_rgba(255,255,255,0.08),0_4px_8px_rgba(0,0,0,0.15)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#C5A880]/10
                  sm:h-10
                  sm:w-10
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 sm:h-4 sm:w-4"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>

                <span
                  className="
                    pointer-events-none
                    absolute
                    -bottom-7.5
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-md
                    bg-[#F5F1EA]
                    px-2
                    py-1
                    text-[9px]
                    uppercase
                    tracking-wider
                    text-[#8B7355]
                    opacity-0
                    shadow-lg
                    transition-all
                    duration-300
                    group-hover:-bottom-8.5
                    group-hover:opacity-100
                  "
                >
                  Instagram
                </span>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="
                  group
                  relative
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-[#C5A880]
                  shadow-[inset_0_0_15px_rgba(255,255,255,0.08),0_4px_8px_rgba(0,0,0,0.15)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#C5A880]/10
                  sm:h-10
                  sm:w-10
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 sm:h-4 sm:w-4"
                >
                  <path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" />
                </svg>

                <span
                  className="
                    pointer-events-none
                    absolute
                    -bottom-7.5
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-md
                    bg-[#F5F1EA]
                    px-2
                    py-1
                    text-[9px]
                    uppercase
                    tracking-wider
                    text-[#8B7355]
                    opacity-0
                    shadow-lg
                    transition-all
                    duration-300
                    group-hover:-bottom-8.5
                    group-hover:opacity-100
                  "
                >
                  Facebook
                </span>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="
                  group
                  relative
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-[#C5A880]
                  shadow-[inset_0_0_15px_rgba(255,255,255,0.08),0_4px_8px_rgba(0,0,0,0.15)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#C5A880]/10
                  sm:h-10
                  sm:w-10
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 sm:h-4 sm:w-4"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>

                <span
                  className="
                    pointer-events-none
                    absolute
                    -bottom-7.5
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-md
                    bg-[#F5F1EA]
                    px-2
                    py-1
                    text-[9px]
                    uppercase
                    tracking-wider
                    text-[#8B7355]
                    opacity-0
                    shadow-lg
                    transition-all
                    duration-300
                    group-hover:-bottom-8.5
                    group-hover:opacity-100
                  "
                >
                  Twitter
                </span>
              </a>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

export default Footer