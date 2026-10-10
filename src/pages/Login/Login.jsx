
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    setError('')

    if (!formData.email.trim() || !formData.password) {
      setError('Please enter your email and password.')
      return
    }

    const email = formData.email.trim().toLowerCase()
    const savedAccount = localStorage.getItem('stayora-account')

    if (!savedAccount) {
      setError('No account found. Please create an account first.')
      return
    }

    let account

    try {
      account = JSON.parse(savedAccount)
    } catch (error) {
      console.error('Could not read saved account:', error)

      localStorage.removeItem('stayora-account')

      setError(
        'Your saved account data is invalid. Please create your account again.'
      )

      return
    }

    if (!account?.email || !account?.password) {
      setError(
        'Your saved account data is incomplete. Please create your account again.'
      )

      return
    }

    if (
      email !== account.email.toLowerCase() ||
      formData.password !== account.password
    ) {
      setError('Email or password is incorrect.')
      return
    }

    login({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      phone: account.phone,
    })

    navigate('/')
  }

  const inputClass =
    'w-full border-0 border-b border-[#D8D0C4] bg-transparent px-0 py-3.5 text-sm text-[#0B0B0B] outline-none transition-colors duration-300 placeholder:text-gray-400 focus:border-[#8B7355] focus:ring-0'

  const labelClass =
    'mb-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-[#77716A]'

  return (
    <main className="min-h-screen bg-[#F5F1EA] px-4 py-24 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-sm bg-white shadow-[0_30px_100px_rgba(11,11,11,0.10)] lg:grid-cols-[1.12fr_0.88fr]">

        {/* Brand panel */}
        <aside className="relative hidden min-h-[760px] flex-col justify-between overflow-hidden bg-[#0B0B0B] p-10 lg:flex xl:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(197,168,128,0.17),transparent_40%),radial-gradient(ellipse_at_90%_85%,rgba(139,115,85,0.13),transparent_38%)]" />

          <div className="pointer-events-none absolute inset-6 border border-white/[0.07]" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-[#C5A880]/60 font-serif text-xl text-[#C5A880]">
                S
              </span>

              <span className="text-sm font-medium uppercase tracking-[0.32em] text-[#F5F1EA]">
                Stayora
              </span>
            </Link>

            <div className="mt-32 max-w-md xl:mt-36">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#C5A880]" />

                <p className="text-[10px] uppercase tracking-[0.28em] text-[#C5A880]">
                  Welcome back
                </p>
              </div>

              <h1 className="mt-7 font-serif text-5xl leading-[1.13] text-[#F5F1EA] xl:text-6xl">
                Your next
                <span className="mt-2 block italic text-[#C5A880]">
                  stay awaits.
                </span>
              </h1>

              <p className="mt-8 max-w-sm text-sm leading-8 text-white/50">
                Return to Stayora and continue discovering exceptional
                places, thoughtful details, and destinations worth
                remembering.
              </p>

              
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
              Luxury stays · Curated for you
            </p>

            
          </div>
        </aside>

        {/* Login form */}
        <section className="flex items-center px-5 py-10 sm:px-10 sm:py-14 md:px-14 lg:px-12 lg:py-16 xl:px-16">
          <div className="mx-auto w-full max-w-xl">

            {/* Mobile brand */}
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2.5 lg:hidden"
            >
              <span className="flex h-9 w-9 items-center justify-center border border-[#C5A880] font-serif text-lg text-[#8B7355]">
                S
              </span>

              <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#0B0B0B]">
                Stayora
              </span>
            </Link>

            <div className="mb-9 sm:mb-11">
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-[#C5A880]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8B7355]">
                  Your journey continues
                </p>
              </div>

              <h2 className="mt-5 font-serif text-4xl leading-tight text-[#0B0B0B] sm:text-5xl">
                Welcome back
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
                Login to your account and pick up where your next
                memorable journey begins.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-7 flex items-start gap-3 border border-red-200 bg-red-50/80 px-4 py-3.5 text-sm text-red-700"
              >
                <svg
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5m0 3h.01" />
                </svg>

                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={inputClass}
                  required
                />
              </div>

              {/* CTA */}
              <button
                type="submit"
                className="group relative mt-4 flex w-full items-center justify-center overflow-hidden rounded-full border border-[#C5A880] bg-[#0B0B0B] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] shadow-[0_0_0_2px_#C5A880] transition-all duration-500 ease-out hover:rounded-xl hover:text-[#0B0B0B] hover:shadow-[0_0_0_10px_transparent] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-4"
              >
                <span className="pointer-events-none absolute inset-0 origin-center scale-0 rounded-full bg-[#C5A880] transition-transform duration-700 ease-out group-hover:scale-100 group-hover:rounded-xl" />

                <span className="relative z-10 flex items-center gap-3 transition-transform duration-500 ease-out group-hover:translate-x-1">
                  Login

                  <svg
                    className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </button>
            </form>

            <div className="my-9 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E9E3DA]" />

              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                Your journey, your way
              </span>

              <div className="h-px flex-1 bg-[#E9E3DA]" />
            </div>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}

              <Link
                to="/register"
                className="font-medium text-[#0B0B0B] underline decoration-[#C5A880] underline-offset-4 transition hover:text-[#8B7355]"
              >
                Create account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login
