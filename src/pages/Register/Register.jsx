
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
    <main className="flex min-h-screen items-center justify-center px-6 py-32">
      <div className="w-full max-w-md">

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Stayora
          </p>

          <h1 className="mt-4 font-serif text-5xl text-gray-900">
            Create account
          </h1>

          <p className="mt-5 text-sm leading-7 text-gray-500">
            Create your account and start planning your next stay.
          </p>
        </div>

        {error && (
          <p className="mt-8 border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >

          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-500"
            >
              First name
            </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-4 text-sm outline-none transition focus:border-gray-900"
              placeholder="Your first name"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-500"
            >
              Last name
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-4 text-sm outline-none transition focus:border-gray-900"
              placeholder="Your last name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-500"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-4 text-sm outline-none transition focus:border-gray-900"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-500"
            >
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-4 text-sm outline-none transition focus:border-gray-900"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-500"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-4 text-sm outline-none transition focus:border-gray-900"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-500"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-4 text-sm outline-none transition focus:border-gray-900"
              placeholder="Repeat your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gray-700"
          >
            Create account
          </button>

        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}

          <Link
            to="/login"
            className="text-gray-900 underline underline-offset-4"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Register

