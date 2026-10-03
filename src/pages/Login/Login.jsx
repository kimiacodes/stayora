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

    if (!formData.email || !formData.password) {
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

    if (
      !account?.email ||
      !account?.password
    ) {
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

  return (
    <main className="min-h-screen bg-[#F5F1EA] px-5 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] lg:grid-cols-[1.15fr_0.85fr]">

        {/* Left side */}
        <div className="relative hidden min-h-[650px] overflow-hidden bg-[#0B0B0B] lg:flex lg:flex-col lg:justify-between p-12 xl:p-16">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.18),transparent_35%)]" />

          <div className="relative z-10">

            <p className="text-xs uppercase tracking-[0.35em] text-[#C5A880]">
              Stayora
            </p>

            <div className="mt-36 max-w-md">

              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Welcome back
              </p>

              <h1 className="mt-6 font-serif text-5xl leading-[1.1] text-[#F5F1EA] xl:text-6xl">
                Your next
                <span className="block text-[#C5A880]">
                  stay awaits.
                </span>
              </h1>

              <p className="mt-8 max-w-sm text-sm leading-8 text-gray-400">
                Return to Stayora and continue discovering
                carefully selected stays and memorable destinations.
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

        {/* Login side */}
        <div className="flex items-center px-6 py-14 sm:px-10 lg:px-14 xl:px-20">

          <div className="mx-auto w-full max-w-md">

            <div className="mb-12">

              <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
                Stayora
              </p>

              <h2 className="mt-4 font-serif text-4xl text-[#0B0B0B] sm:text-5xl">
                Welcome back
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Login to your account and manage your stays.
              </p>

            </div>

            {error && (
              <p className="mb-8 border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

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

              {/* Password */}
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
                  placeholder="Enter your password"
                  className="w-full border-b border-[#D8D0C4] bg-transparent px-0 py-3 text-sm text-[#0B0B0B] outline-none transition placeholder:text-gray-400 focus:border-[#0B0B0B]"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="group mt-5 flex w-full items-center justify-between bg-[#0B0B0B] px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#C5A880]"
              >
                <span>Login</span>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#D8D0C4]" />

              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                Stayora
              </span>

              <div className="h-px flex-1 bg-[#D8D0C4]" />
            </div>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}

              <Link
                to="/register"
                className="text-[#0B0B0B] underline decoration-[#C5A880] underline-offset-4 transition hover:text-[#8B7355]"
              >
                Create account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </main>
  )
}

export default Login