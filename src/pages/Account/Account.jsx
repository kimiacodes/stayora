
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

function Account() {
  const { user, updateUser, logout } = useAuth()

  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
  })

  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleEdit() {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
    })

    setError('')
    setIsEditing(true)
  }

  function handleCancel() {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
    })

    setError('')
    setIsEditing(false)
  }

 
function handleSubmit(e) {
  e.preventDefault()

  setError('')

  if (
    !formData.firstName.trim() ||
    !formData.lastName.trim() ||
    !formData.email.trim() ||
    !formData.phone.trim()
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

  const updatedUser = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email,
    phone: formData.phone.trim(),
  }

  let currentAccount = {}

  const savedAccount = localStorage.getItem('stayora-account')

  if (savedAccount) {
    try {
      currentAccount = JSON.parse(savedAccount)
    } catch (error) {
      console.error('Could not read saved account:', error)

      localStorage.removeItem('stayora-account')
    }
  }

  try {
    localStorage.setItem(
      'stayora-account',
      JSON.stringify({
        ...currentAccount,
        ...updatedUser,
      })
    )
  } catch (error) {
    console.error('Could not save account:', error)

    setError('Could not save your changes. Please try again.')
    return
  }

  updateUser(updatedUser)

  setFormData(updatedUser)
  setIsEditing(false)
}



  return (
    <main className="min-h-screen bg-white px-6 pb-24 pt-32 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <section className="border-b border-gray-200 pb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            My account
          </p>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif text-5xl leading-tight text-gray-900 sm:text-6xl">
                Welcome, {user.firstName}.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
                Manage your personal information and keep track of
                your stays with Stayora.
              </p>
            </div>

            <div className="hidden h-20 w-20 items-center justify-center border border-gray-200 lg:flex">
              <span className="font-serif text-2xl text-gray-900">
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* Personal Information */}
          <section className="border border-gray-200 p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Personal information
                </p>

                <h2 className="mt-2 font-serif text-2xl text-gray-900">
                  Your details
                </h2>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="self-start text-xs uppercase tracking-[0.2em] text-gray-900 underline underline-offset-4 transition hover:text-gray-500"
                >
                  Edit information
                </button>
              )}
            </div>

            {error && (
              <p className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {!isEditing ? (
              <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                    First name
                  </p>

                  <p className="mt-2 text-sm text-gray-900">
                    {user.firstName}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                    Last name
                  </p>

                  <p className="mt-2 text-sm text-gray-900">
                    {user.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                    Email
                  </p>

                  <p className="mt-2 break-all text-sm text-gray-900">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                    Phone
                  </p>

                  <p className="mt-2 text-sm text-gray-900">
                    {user.phone || 'Not provided'}
                  </p>
                </div>

              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >

                <div className="grid gap-6 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-xs uppercase tracking-[0.15em] text-gray-500"
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
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-xs uppercase tracking-[0.15em] text-gray-500"
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
                    />
                  </div>

                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-gray-500"
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
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-gray-500"
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
                  />
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row">

                  <button
                    type="submit"
                    className="bg-gray-900 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gray-700"
                  >
                    Save changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="border border-gray-300 px-8 py-4 text-xs uppercase tracking-[0.2em] text-gray-900 transition hover:border-gray-900"
                  >
                    Cancel
                  </button>

                </div>
              </form>
            )}
          </section>

          {/* Account Navigation */}
          <aside className="h-fit border border-gray-200 p-6 sm:p-8">

            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Account
            </p>

            <div className="mt-6">

              <Link
                to="/my-bookings"
                className="group flex items-center justify-between border-b border-gray-200 py-5 text-sm text-gray-900"
              >
                <span>My bookings</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/hotels"
                className="group flex items-center justify-between border-b border-gray-200 py-5 text-sm text-gray-900"
              >
                <span>Explore stays</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <button
                type="button"
                onClick={logout}
                className="group flex w-full items-center justify-between py-5 text-sm text-gray-500 transition hover:text-red-600"
              >
                <span>Logout</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </div>
          </aside>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Stayora
          </p>

          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">
            Your account is where you can manage your details and
            access your reservations in one place.
          </p>
        </div>

      </div>
    </main>
  )
}

export default Account

