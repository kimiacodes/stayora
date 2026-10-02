
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
    <main className="flex min-h-screen items-center justify-center px-6 py-32">
      <div className="w-full max-w-md">

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Stayora
          </p>

          <h1 className="mt-4 font-serif text-5xl text-gray-900">
            Welcome back
          </h1>

          <p className="mt-5 text-sm leading-7 text-gray-500">
            Login to your account and manage your stays.
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
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gray-700"
          >
            Login
          </button>

        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{' '}

          <Link
            to="/register"
            className="text-gray-900 underline underline-offset-4"
          >
            Create account
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Login

