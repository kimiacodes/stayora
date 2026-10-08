
import { useState } from 'react'

import { useAuth } from '../../context/AuthContext'

function Account() {
  const { user, updateUser } = useAuth()

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

    setFormData((current) => ({
      ...current,
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

    const savedAccount =
      localStorage.getItem('stayora-account')

    if (savedAccount) {
      try {
        currentAccount = JSON.parse(savedAccount)
      } catch (error) {
        console.error(
          'Could not read saved account:',
          error
        )

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
      console.error(
        'Could not save account:',
        error
      )

      setError(
        'Could not save your changes. Please try again.'
      )

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
        <label
          htmlFor={name}
          className={labelClass}
        >
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
        <div className="mt-8">
          {/* Personal Details */}
          <section className="border border-[#D8D0C4] bg-white">
            <div className="p-6 sm:p-9">

              {/* Section Header */}
              <div className="border-b border-[#E8E2D9] pb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                  PROFILE
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#0B0B0B]">
                  Personal details
                </h2>
              </div>

              {/* Error */}
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
                    [
                      'Phone number',
                      user.phone || 'Not provided',
                    ],
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
                  className="mt-7"
                >
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {renderField(
                        'First name',
                        'firstName'
                      )}

                      {renderField(
                        'Last name',
                        'lastName'
                      )}
                    </div>

                    {renderField(
                      'Email address',
                      'email',
                      'email'
                    )}

                    {renderField(
                      'Phone number',
                      'phone',
                      'tel'
                    )}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

              {/* Edit Information */}
              {!isEditing && (
                <div className="mt-8 border-t border-[#E8E2D9] pt-6">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="border border-[#D8D0C4] bg-white px-5 py-2.5 text-[10px] uppercase tracking-[0.16em] text-[#0B0B0B] transition duration-300 hover:border-[#8B7355] hover:bg-[#F8F5F0]"
                  >
                    Edit information
                  </button>
                </div>
              )}

            </div>
          </section>
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
