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

      
<nav className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-5 lg:px-10 xl:px-14 2xl:px-16">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="font-serif text-2xl tracking-[0.2em] text-white transition hover:text-[#C5A880]"
        >
          STAYORA
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">

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
            <div className="flex items-center gap-6">

              <Link
                to="/account"
                className="text-sm tracking-wide text-white transition hover:text-[#C5A880]"
              >
                {user.firstName} {user.lastName}
              </Link>

              <Link
                to="/my-bookings"
                className="text-sm tracking-wide text-white/80 transition hover:text-[#C5A880]"
              >
                My bookings
              </Link>

              <button
                type="button"
                onClick={logout}
                className="text-sm tracking-wide text-white/80 transition hover:text-[#C5A880]"
              >
                Logout
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm tracking-wide text-white/80 transition hover:text-[#C5A880]"
            >
              Sign in
            </Link>
          )}

          {/* Book Button */}
          <Link
            to="/hotels"
            className="border border-[#C5A880]/70 px-5 py-2.5 text-sm tracking-wide text-[#F5F1EA] transition duration-300 hover:bg-[#C5A880] hover:text-[#0B0B0B]"
          >
            Book a stay
          </Link>

        </div>


        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center text-2xl text-white transition hover:text-[#C5A880] md:hidden"
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

        <div className="px-6 py-7">

          {/* Main Navigation */}
          <div className="flex flex-col">

            <Link
              to="/hotels"
              onClick={closeMenu}
              className="border-b border-white/10 py-4 text-sm uppercase tracking-[0.15em] text-white/90 transition hover:text-[#C5A880]"
            >
              Stays
            </Link>

            <Link
              to="/destinations"
              onClick={closeMenu}
              className="border-b border-white/10 py-4 text-sm uppercase tracking-[0.15em] text-white/90 transition hover:text-[#C5A880]"
            >
              Destinations
            </Link>

            <Link
              to="/experiences"
              onClick={closeMenu}
              className="border-b border-white/10 py-4 text-sm uppercase tracking-[0.15em] text-white/90 transition hover:text-[#C5A880]"
            >
              Experiences
            </Link>

          </div>


          {/* Account Section */}
          <div className="mt-6">

            {user ? (
              <div className="border border-white/10 bg-white/3 p-5">

                {/* User */}
                <Link
                  to="/account"
                  onClick={closeMenu}
                  className="block text-base text-white transition hover:text-[#C5A880]"
                >
                  {user.firstName} {user.lastName}
                </Link>

                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/40">
                  Your account
                </p>


                {/* Account Links */}
                <div className="mt-5 flex flex-col gap-4">

                  <Link
                    to="/my-bookings"
                    onClick={closeMenu}
                    className="text-sm text-white/70 transition hover:text-[#C5A880]"
                  >
                    My bookings
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-fit text-sm text-white/70 transition hover:text-[#C5A880]"
                  >
                    Logout
                  </button>

                </div>

              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block border border-white/15 px-5 py-4 text-center text-sm uppercase tracking-[0.15em] text-white transition hover:border-[#C5A880] hover:text-[#C5A880]"
              >
                Sign in
              </Link>
            )}

          </div>


          {/* Mobile CTA */}
          <Link
            to="/hotels"
            onClick={closeMenu}
            className="mt-5 block bg-[#C5A880] px-5 py-4 text-center text-sm uppercase tracking-[0.15em] text-[#0B0B0B] transition duration-300 hover:bg-[#8B7355]"
          >
            Book a stay
          </Link>

        </div>

      </div>

    </header>
  )
}

export default Navbar