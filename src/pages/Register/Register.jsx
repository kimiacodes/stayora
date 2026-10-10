
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all fields.')
      return
    }

    const email = formData.email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    const savedAccount = localStorage.getItem('stayora-account')

    if (savedAccount) {
      try {
        const account = JSON.parse(savedAccount)

        if (
          account?.email &&
          account.email.toLowerCase() === email
        ) {
          setError('An account with this email already exists.')
          return
        }
      } catch (error) {
        console.error('Could not read saved account:', error)
        localStorage.removeItem('stayora-account')
      }
    }

    const newUser = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email,
      phone: formData.phone.trim(),
      password: formData.password,
    }

    try {
      localStorage.setItem(
        'stayora-account',
        JSON.stringify(newUser)
      )
    } catch (error) {
      console.error('Could not save account:', error)
      setError('Could not create your account. Please try again.')
      return
    }

    navigate('/login')
  }

  const inputClass =
    'w-full border-0 border-b border-[#D8D0C4] bg-transparent px-0 py-3.5 text-sm text-[#0B0B0B] outline-none transition-colors duration-300 placeholder:text-gray-400 focus:border-[#8B7355] focus:ring-0'

  const labelClass =
    'mb-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-[#77716A]'

  return (
    <main className="min-h-screen bg-[#F5F1EA] px-4 py-24 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-sm bg-white shadow-[0_30px_100px_rgba(11,11,11,0.10)] lg:grid-cols-[0.88fr_1.12fr]">

        {/* Brand panel */}
        <aside className="relative hidden min-h-[820px] flex-col justify-between overflow-hidden bg-[#0B0B0B] p-10 lg:flex xl:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(197,168,128,0.17),transparent_40%),radial-gradient(ellipse_at_90%_85%,rgba(139,115,85,0.13),transparent_38%)]" />

          <div className="pointer-events-none absolute inset-6 border border-white/[0.07]" />

          <div className="relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center border border-[#C5A880]/60 font-serif text-xl text-[#C5A880]">
                S
              </span>

              <span className="text-sm font-medium uppercase tracking-[0.32em] text-[#F5F1EA]">
                Stayora
              </span>
            </Link>

            <div className="mt-36 max-w-md">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#C5A880]" />

                <p className="text-[10px] uppercase tracking-[0.28em] text-[#C5A880]">
                  Your journey begins here
                </p>
              </div>

              <h1 className="mt-7 font-serif text-5xl leading-[1.13] text-[#F5F1EA] xl:text-6xl">
                Stay somewhere
                <span className="mt-2 block italic text-[#C5A880]">
                  unforgettable.
                </span>
              </h1>

              <p className="mt-8 max-w-sm text-sm leading-8 text-white/50">
                Discover exceptional places, thoughtful details,
                and stays that turn every journey into a lasting memory.
              </p>

              
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
              Luxury stays · Curated for you
            </p>

            
          </div>
        </aside>

        {/* Registration form */}
        <section className="px-5 py-10 sm:px-10 sm:py-12 md:px-14 lg:px-12 lg:py-14 xl:px-16">
          <div className="mx-auto max-w-xl">

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
                  Welcome to Stayora
                </p>
              </div>

              <h2 className="mt-5 font-serif text-4xl leading-tight text-[#0B0B0B] sm:text-5xl">
                Create account
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
                Your next extraordinary stay starts with a few simple details.
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

            <form onSubmit={handleSubmit} className="space-y-7">

              {/* Name */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    First name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    Last name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

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

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className={inputClass}
                  required
                />
              </div>

              {/* Passwords */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className={labelClass}>
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className={labelClass}
                  >
                    Confirm password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Submit */}
             
<button
  type="submit"
  className="group relative mt-4 flex w-full items-center justify-center overflow-hidden rounded-full border border-[#C5A880] bg-[#0B0B0B] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] shadow-[0_0_0_2px_#C5A880] transition-all duration-500 ease-out hover:rounded-xl hover:text-[#0B0B0B] hover:shadow-[0_0_0_10px_transparent] active:scale-[0.98]"
>
  {/* Full gold hover effect */}
  <span className="absolute inset-0 scale-0 rounded-full bg-[#C5A880] transition-transform duration-700 ease-out group-hover:scale-100 group-hover:rounded-xl" />

  {/* Button content */}
  <span className="relative z-10 flex items-center gap-3 transition-transform duration-500 ease-out group-hover:translate-x-1">
    Create account

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

            <div className="mt-9 flex flex-col items-center gap-5">
              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-[#0B0B0B] underline decoration-[#C5A880] underline-offset-4 transition hover:text-[#8B7355]"
                >
                  Login
                </Link>
              </p>

              <div className="flex w-full items-center gap-3">
                <span className="h-px flex-1 bg-[#E9E3DA]" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                  Your journey, your way
                </span>
                <span className="h-px flex-1 bg-[#E9E3DA]" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Register
