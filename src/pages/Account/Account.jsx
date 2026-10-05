// src/pages/Account/Account.jsx

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
    setFormData((current) => ({ ...current, [name]: value }))
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
        JSON.stringify({ ...currentAccount, ...updatedUser })
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

  const inputClass =
    'w-full border-b border-[#D8D0C4] bg-transparent py-3 text-sm text-[#0B0B0B] outline-none transition focus:border-[#C5A880]'

  const labelClass =
    'mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#8B7355]'

  function renderField(label, name, type = 'text') {
    return (
      <div>
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>

        <input
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F1EA] px-5 pb-20 pt-28 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="border-b border-[#D8D0C4] pb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
              MY ACCOUNT
            </p>

            <h1 className="mt-4 font-serif text-4xl text-[#0B0B0B] sm:text-5xl">
              Welcome, {user.firstName}.
            </h1>

            <p className="mt-3 text-sm text-[#756D63]">
              Manage your personal information and reservations.
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1fr_280px]">

          {/* Personal Details */}
          <section className="flex h-full flex-col border border-[#D8D0C4] bg-white">

            <div className="flex flex-1 flex-col p-6 sm:p-9">

              {/* Section Header */}
              <div className="border-b border-[#E8E2D9] pb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                  PROFILE
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#0B0B0B]">
                  Personal details
                </h2>
              </div>

              {error && (
                <p className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {!isEditing ? (
                <div className="mt-6 grid gap-7 sm:grid-cols-2">
                  {[
                    ['First name', user.firstName],
                    ['Last name', user.lastName],
                    ['Email address', user.email],
                    ['Phone number', user.phone || 'Not provided'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="border-b border-[#E8E2D9] pb-4"
                    >
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#9B9286]">
                        {label}
                      </p>

                      <p className="mt-2 break-words text-sm text-[#0B0B0B]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-7 flex flex-1 flex-col"
                >
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {renderField('First name', 'firstName')}
                      {renderField('Last name', 'lastName')}
                    </div>

                    {renderField('Email address', 'email', 'email')}
                    {renderField('Phone number', 'phone', 'tel')}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                    <button
                      type="submit"
                      className="bg-[#0B0B0B] px-7 py-3.5 text-xs uppercase tracking-[0.15em] text-white transition hover:bg-[#8B7355]"
                    >
                      Save changes
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="border border-[#D8D0C4] px-7 py-3.5 text-xs uppercase tracking-[0.15em] text-[#0B0B0B] transition hover:border-[#0B0B0B]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Button */}
              {!isEditing && (
                <div className="mt-auto flex justify-end pt-8">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#0B0B0B] px-4 py-3 text-center text-[10px] uppercase tracking-[0.18em] text-white outline-offset-4 transition-transform duration-300 ease-in-out focus:outline-2 focus:outline-white focus:outline-offset-4"
                  >
                    <span className="relative z-20">
                      Edit information
                    </span>

                    {/* Shine */}
                    <span className="absolute left-[-75%] top-0 z-10 h-full w-[50%] rotate-12 bg-white/20 blur-lg transition-all duration-1000 ease-in-out group-hover:left-[125%]" />

                    {/* Top Left */}
                    <span className="absolute left-0 top-0 z-10 block h-[20%] w-1/2 rounded-tl-lg border-l-2 border-t-2 border-[#C5A880]" />

                    {/* Top Right */}
                    <span className="absolute right-0 top-0 z-10 block h-[60%] w-1/2 rounded-tr-lg border-r-2 border-t-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                    {/* Bottom Left */}
                    <span className="absolute bottom-0 left-0 z-10 block h-[60%] w-1/2 rounded-bl-lg border-b-2 border-l-2 border-[#C5A880] transition-all duration-300 group-hover:h-[90%]" />

                    {/* Bottom Right */}
                    <span className="absolute bottom-0 right-0 z-10 block h-[20%] w-1/2 rounded-br-lg border-b-2 border-r-2 border-[#C5A880]" />
                  </button>
                </div>
              )}

            </div>
          </section>

          {/* Your Account */}
          <aside className="flex h-full flex-col border border-[#D8D0C4] bg-[#E9E1D5]">

            <div className="flex flex-1 flex-col px-6">

              {/* Account Header */}
              <div className="flex items-center justify-between border-b border-[#CFC4B5] py-6">

                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355]">
                    STAYORA
                  </p>

                  <h2 className="mt-2 font-serif text-2xl text-[#0B0B0B]">
                    Your account
                  </h2>
                </div>

                {/* Account Initial */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#8B7355] bg-[#171512] font-serif text-base text-[#C5A880]">
                  {user.firstName?.charAt(0).toUpperCase()}
                </div>

              </div>

              {/* Account Navigation */}
              <nav className="flex-1">

                <Link
                  to="/my-bookings"
                  className="group flex items-center justify-between border-b border-[#CFC4B5] py-5 text-sm text-[#0B0B0B] transition hover:text-[#8B7355]"
                >
                  <span>My bookings</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/hotels"
                  className="group flex items-center justify-between border-b border-[#CFC4B5] py-5 text-sm text-[#0B0B0B] transition hover:text-[#8B7355]"
                >
                  <span>Explore stays</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  className="group flex w-full items-center justify-between py-5 text-sm text-[#756D63] transition hover:text-red-600"
                >
                  <span>Logout</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

              </nav>

            </div>
          </aside>

        </div>

        {/* Footer */}
        <footer className="mt-8 border-t border-[#D8D0C4] pt-5 text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
          STAYORA — YOUR STAY, YOUR WAY
        </footer>

      </div>
    </main>
  )
}

export default Account