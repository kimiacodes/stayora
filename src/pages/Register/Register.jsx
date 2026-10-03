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
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
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

  return (
    <main className="min-h-screen bg-[#F5F1EA] px-5 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] lg:grid-cols-[0.85fr_1.15fr]">

        {/* Left side */}
        <div className="relative hidden min-h-[760px] overflow-hidden bg-[#0B0B0B] lg:flex lg:flex-col lg:justify-between p-12 xl:p-16">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.18),transparent_35%)]" />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[#C5A880]">
              Stayora
            </p>

            <div className="mt-32 max-w-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Your journey begins here
              </p>

              <h1 className="mt-6 font-serif text-5xl leading-[1.1] text-[#F5F1EA] xl:text-6xl">
                Stay somewhere
                <span className="block text-[#C5A880]">
                  unforgettable.
                </span>
              </h1>

              <p className="mt-8 max-w-sm text-sm leading-8 text-gray-400">
                Create your Stayora account and discover carefully
                selected stays designed around comfort, character,
                and unforgettable experiences.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
              Luxury stays · Curated for you
            </p>

            <span className="font-serif text-2xl text-[#C5A880]">
              S
            </span>
          </div>
        </div>

        {/* Form side */}
        <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-14 xl:px-20 xl:py-16">

          <div className="mx-auto max-w-xl">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
                Welcome to Stayora
              </p>

              <h2 className="mt-4 font-serif text-4xl text-[#0B0B0B] sm:text-5xl">
                Create account
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
                Create your account and start planning your next stay.
              </p>
            </div>

            {error && (
              <p className="mb-8 border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-gray-500"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    className="w-full border-b border-[#D8D0C4] bg-transparent px-0 py-3 text-sm text-[#0B0B0B] outline-none transition placeholder:text-gray-400 focus:border-[#0B0B0B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-gray-500"
                  >
                    Last name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    className="w-full border-b border-[#D8D0C4] bg-transparent px-0 py-3 text-sm text-[#0B0B0B] outline-none transition placeholder:text-gray-400 focus:border-[#0B0B0B]"
                  />
                </div>

              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-gray-500"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border-b border-[#D8D0C4] bg-transparent px-0 py-3 text-sm text-[#0B0B0B] outline-none transition placeholder:text-gray-400 focus:border-[#0B0B0B]"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-gray-500"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="w-full border-b border-[#D8D0C4] bg-transparent px-0 py-3 text-sm text-[#0B0B0B] outline-none transition placeholder:text-gray-400 focus:border-[#0B0B0B]"
                />
              </div>

              {/* Password */}
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-gray-500"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full border-b border-[#D8D0C4] bg-transparent px-0 py-3 text-sm text-[#0B0B0B] outline-none transition placeholder:text-gray-400 focus:border-[#0B0B0B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-gray-500"
                  >
                    Confirm password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    className="w-full border-b border-[#D8D0C4] bg-transparent px-0 py-3 text-sm text-[#0B0B0B] outline-none transition placeholder:text-gray-400 focus:border-[#0B0B0B]"
                  />
                </div>

              </div>

              {/* Button */}
              <button
                type="submit"
                className="group mt-4 flex w-full items-center justify-between bg-[#0B0B0B] px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#C5A880]"
              >
                <span>Create account</span>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{' '}

              <Link
                to="/login"
                className="text-[#0B0B0B] underline decoration-[#C5A880] underline-offset-4 transition hover:text-[#8B7355]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register