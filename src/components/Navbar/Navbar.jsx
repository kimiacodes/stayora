import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  return (
    <header className="absolute left-0 top-0 z-50 w-full animate-[fadeDown_0.8s_ease-out] bg-[#0B0B0B]/95 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-1600 items-center justify-between px-5 py-4 sm:px-6 sm:py-5 lg:px-10 xl:px-14 2xl:px-16">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="font-serif text-xl tracking-[0.2em] text-white transition hover:text-[#C5A880] sm:text-2xl"
        >
          STAYORA
        </Link>

        {/* Desktop Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          <Link
            to="/hotels"
            className="text-sm tracking-wide text-white/80 transition hover:text-[#C5A880]"
          >
            Stays
          </Link>

          <Link
            to="/destinations"
            className="text-sm tracking-wide text-white/80 transition hover:text-[#C5A880]"
          >
            Destinations
          </Link>

          <Link
            to="/experiences"
            className="text-sm tracking-wide text-white/80 transition hover:text-[#C5A880]"
          >
            Experiences
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-7 md:flex">
          {user ? (
            <Link
              to="/account"
              className="group flex items-center gap-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C5A880]/50 bg-[#C5A880]/10 font-serif text-sm text-[#C5A880] transition duration-300 group-hover:bg-[#C5A880] group-hover:text-[#0B0B0B]">
                {user.firstName?.charAt(0).toUpperCase()}
              </span>

              <span className="flex flex-col">
                <span className="text-sm tracking-wide text-white transition group-hover:text-[#C5A880]">
                  {user.firstName} {user.lastName}
                </span>

                <span className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Account
                </span>
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-5">

              {/* Login */}
              <Link
                to="/login"
                className="group relative cursor-pointer overflow-hidden bg-[#0B0B0B] px-5 py-2.5 text-center text-xs uppercase tracking-[0.2em] text-white outline-offset-4 transition-transform duration-300 ease-in-out focus:outline-2 focus:outline-white focus:outline-offset-4"
              >
                <span className="relative z-20">
                  Login
                </span>

                <span className="absolute left-[-75%] top-0 z-10 h-full w-[50%] rotate-12 bg-white/20 blur-lg transition-all duration-1000 ease-in-out group-hover:left-[125%]" />

                <span className="absolute left-0 top-0 z-10 block h-[20%] w-1/2 rounded-tl-lg border-l-2 border-t-2 border-[#C5A880]" />

                <span className="absolute right-0 top-0 z-10 block h-[60%] w-1/2 rounded-tr-lg border-r-2 border-t-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                <span className="absolute bottom-0 left-0 z-10 block h-[60%] w-1/2 rounded-bl-lg border-b-2 border-l-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                <span className="absolute bottom-0 right-0 z-10 block h-[20%] w-1/2 rounded-br-lg border-b-2 border-r-2 border-[#C5A880]" />
              </Link>

              {/* Sign in */}
              <Link
                to="/register"
                className="group relative cursor-pointer overflow-hidden bg-[#0B0B0B] px-5 py-2.5 text-center text-xs uppercase tracking-[0.2em] text-white outline-offset-4 transition-transform duration-300 ease-in-out focus:outline-2 focus:outline-white focus:outline-offset-4"
              >
                <span className="relative z-20">
                  Sign in
                </span>

                <span className="absolute left-[-75%] top-0 z-10 h-full w-[50%] rotate-12 bg-white/20 blur-lg transition-all duration-1000 ease-in-out group-hover:left-[125%]" />

                <span className="absolute left-0 top-0 z-10 block h-[20%] w-1/2 rounded-tl-lg border-l-2 border-t-2 border-[#C5A880]" />

                <span className="absolute right-0 top-0 z-10 block h-[60%] w-1/2 rounded-tr-lg border-r-2 border-t-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                <span className="absolute bottom-0 left-0 z-10 block h-[60%] w-1/2 rounded-bl-lg border-b-2 border-l-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                <span className="absolute bottom-0 right-0 z-10 block h-[20%] w-1/2 rounded-br-lg border-b-2 border-r-2 border-[#C5A880]" />
              </Link>

            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-9 w-9 items-center justify-center text-xl text-white transition hover:text-[#C5A880] sm:h-10 sm:w-10 sm:text-2xl md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0B0B0B]/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMenuOpen
            ? 'max-h-150 opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 py-6 sm:px-6 sm:py-7">

          {/* Account */}
          {user && (
            <Link
              to="/account"
              onClick={closeMenu}
              className="group flex items-center gap-3 border border-white/10 bg-white/[0.03] p-4 sm:p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C5A880]/50 bg-[#C5A880]/10 font-serif text-sm text-[#C5A880] transition duration-300 group-hover:bg-[#C5A880] group-hover:text-[#0B0B0B]">
                {user.firstName?.charAt(0).toUpperCase()}
              </span>

              <span className="flex flex-col">
                <span className="text-sm text-white transition group-hover:text-[#C5A880] sm:text-base">
                  {user.firstName} {user.lastName}
                </span>

                <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Your account
                </span>
              </span>
            </Link>
          )}

          {/* Navigation */}
          <div className="mt-5 flex flex-col sm:mt-6">
            <Link
              to="/hotels"
              onClick={closeMenu}
              className="border-b border-white/10 py-3.5 text-xs uppercase tracking-[0.15em] text-white/90 transition hover:text-[#C5A880] sm:py-4 sm:text-sm"
            >
              Stays
            </Link>

            <Link
              to="/destinations"
              onClick={closeMenu}
              className="border-b border-white/10 py-3.5 text-xs uppercase tracking-[0.15em] text-white/90 transition hover:text-[#C5A880] sm:py-4 sm:text-sm"
            >
              Destinations
            </Link>

            <Link
              to="/experiences"
              onClick={closeMenu}
              className="border-b border-white/10 py-3.5 text-xs uppercase tracking-[0.15em] text-white/90 transition hover:text-[#C5A880] sm:py-4 sm:text-sm"
            >
              Experiences
            </Link>
          </div>

          {/* Auth */}
          <div className="mt-6">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-[#0B0B0B] px-4 py-3 text-center text-[10px] uppercase tracking-[0.18em] text-white outline-offset-4 transition-transform duration-300 ease-in-out focus:outline-2 focus:outline-white focus:outline-offset-4"
              >
                <span className="relative z-20">
                  Logout
                </span>

                <span className="absolute left-[-75%] top-0 z-10 h-full w-[50%] rotate-12 bg-white/20 blur-lg transition-all duration-1000 ease-in-out group-hover:left-[125%]" />

                <span className="absolute left-0 top-0 z-10 block h-[20%] w-1/2 rounded-tl-lg border-l-2 border-t-2 border-[#C5A880]" />

                <span className="absolute right-0 top-0 z-10 block h-[60%] w-1/2 rounded-tr-lg border-r-2 border-t-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                <span className="absolute bottom-0 left-0 z-10 block h-[60%] w-1/2 rounded-bl-lg border-b-2 border-l-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                <span className="absolute bottom-0 right-0 z-10 block h-[20%] w-1/2 rounded-br-lg border-b-2 border-r-2 border-[#C5A880]" />
              </button>
            ) : (
              <div className="flex gap-3">

                {/* Login */}
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="group relative flex flex-1 cursor-pointer items-center justify-center overflow-hidden bg-[#0B0B0B] px-4 py-3 text-center text-[10px] uppercase tracking-[0.18em] text-white outline-offset-4 transition-transform duration-300 ease-in-out focus:outline-2 focus:outline-white focus:outline-offset-4"
                >
                  <span className="relative z-20">
                    Login
                  </span>

                  <span className="absolute left-[-75%] top-0 z-10 h-full w-[50%] rotate-12 bg-white/20 blur-lg transition-all duration-1000 ease-in-out group-hover:left-[125%]" />

                  <span className="absolute left-0 top-0 z-10 block h-[20%] w-1/2 rounded-tl-lg border-l-2 border-t-2 border-[#C5A880]" />

                  <span className="absolute right-0 top-0 z-10 block h-[60%] w-1/2 rounded-tr-lg border-r-2 border-t-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                  <span className="absolute bottom-0 left-0 z-10 block h-[60%] w-1/2 rounded-bl-lg border-b-2 border-l-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                  <span className="absolute bottom-0 right-0 z-10 block h-[20%] w-1/2 rounded-br-lg border-b-2 border-r-2 border-[#C5A880]" />
                </Link>

                {/* Sign in */}
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="group relative flex flex-1 cursor-pointer items-center justify-center overflow-hidden bg-[#0B0B0B] px-4 py-3 text-center text-[10px] uppercase tracking-[0.18em] text-white outline-offset-4 transition-transform duration-300 ease-in-out focus:outline-2 focus:outline-white focus:outline-offset-4"
                >
                  <span className="relative z-20">
                    Sign in
                  </span>

                  <span className="absolute left-[-75%] top-0 z-10 h-full w-[50%] rotate-12 bg-white/20 blur-lg transition-all duration-1000 ease-in-out group-hover:left-[125%]" />

                  <span className="absolute left-0 top-0 z-10 block h-[20%] w-1/2 rounded-tl-lg border-l-2 border-t-2 border-[#C5A880]" />

                  <span className="absolute right-0 top-0 z-10 block h-[60%] w-1/2 rounded-tr-lg border-r-2 border-t-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                  <span className="absolute bottom-0 left-0 z-10 block h-[60%] w-1/2 rounded-bl-lg border-b-2 border-l-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                  <span className="absolute bottom-0 right-0 z-10 block h-[20%] w-1/2 rounded-br-lg border-b-2 border-r-2 border-[#C5A880]" />
                </Link>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar