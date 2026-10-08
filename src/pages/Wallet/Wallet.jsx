
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { WalletCards, ArrowLeft, Plus } from 'lucide-react'

import { useBooking } from '../../context/BookingContext'
import { useAuth } from '../../context/AuthContext'

function Wallet() {
  const { user } = useAuth()
  const { walletBalance, addToWallet } = useBooking()

  const [amount, setAmount] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const formattedBalance = Number(walletBalance || 0).toLocaleString(
    'en-US',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )

  const quickAmounts = [50, 100, 250, 500]

  function handleAddMoney() {
    const numericAmount = Number(amount)

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return
    }

    addToWallet(numericAmount)
    setAmount('')
    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  function handleQuickAmount(value) {
    setAmount(String(value))
    setShowSuccess(false)
  }

  return (
    <main className="min-h-screen bg-[#F5F1EA] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[#8B7355]">
              <span className="h-px w-8 bg-[#C5A880]" />
              Your wallet
            </p>

            <h1 className="text-4xl font-light tracking-tight text-[#0B0B0B] sm:text-5xl">
              Stayora Wallet.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#6F6A63]">
              Add funds to your wallet and use them whenever you
              book your next stay.
            </p>
          </div>

          <Link
            to="/"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-[#0B0B0B]"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to stays
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">

          {/* Balance */}
          <section className="flex min-h-[360px] flex-col justify-between rounded-[2rem] bg-[#0B0B0B] p-7 text-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-9">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#C5A880]">
                  Available balance
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-lg text-[#C5A880]">$</span>

                  <span className="text-5xl font-light tracking-tight sm:text-6xl">
                    {formattedBalance}
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10">
                <WalletCards
                  size={22}
                  strokeWidth={1.5}
                  className="text-[#C5A880]"
                />
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-sm text-white/60">
                {user?.firstName
                  ? `${user.firstName}'s Stayora Wallet`
                  : 'Your Stayora Wallet'}
              </p>

              <p className="mt-2 text-xs leading-5 text-white/40">
                Refunds from cancelled reservations are added
                directly to this balance.
              </p>
            </div>
          </section>

          {/* Add money */}
          <section className="rounded-[2rem] border border-[#D8D0C4] bg-white p-7 shadow-[0_15px_50px_rgba(65,55,40,0.05)] sm:p-9">
            <div className="mb-8">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F1EA]">
                <Plus
                  size={20}
                  strokeWidth={1.6}
                  className="text-[#8B7355]"
                />
              </div>

              <h2 className="text-2xl font-light text-[#0B0B0B]">
                Add money
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#77716A]">
                Choose an amount or enter a custom value to add
                funds to your wallet.
              </p>
            </div>

            {/* Quick amounts */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {quickAmounts.map((value) => {
                const isSelected = amount === String(value)

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleQuickAmount(value)}
                    className={`rounded-xl border px-4 py-3 text-sm transition-all duration-300 ${
                      isSelected
                        ? 'border-[#8B7355] bg-[#8B7355] text-white'
                        : 'border-[#D8D0C4] bg-[#F9F7F3] text-[#0B0B0B] hover:border-[#8B7355] hover:bg-[#F5F1EA]'
                    }`}
                  >
                    ${value}
                  </button>
                )
              })}
            </div>

            {/* Custom amount */}
            <div className="mt-6">
              <label
                htmlFor="wallet-amount"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#6F6A63]"
              >
                Custom amount
              </label>

              <div className="flex items-center rounded-xl border border-[#D8D0C4] bg-[#F9F7F3] px-4 transition-colors focus-within:border-[#8B7355]">
                <span className="mr-2 text-sm text-[#8B7355]">
                  $
                </span>

                <input
                  id="wallet-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value)
                    setShowSuccess(false)
                  }}
                  placeholder="Enter amount"
                  className="w-full bg-transparent py-4 text-sm text-[#0B0B0B] outline-none placeholder:text-[#A49D94]"
                />
              </div>
            </div>

            {/* Success message */}
            {showSuccess && (
              <div className="mt-5 rounded-xl border border-[#C5A880]/40 bg-[#F5F1EA] px-4 py-3 text-sm text-[#6B5A43]">
                Money has been added to your Stayora Wallet.
              </div>
            )}

            {/* Add button */}
            <button
              type="button"
              onClick={handleAddMoney}
              disabled={!amount || Number(amount) <= 0}
              className="group relative mt-6 flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#0B0B0B] px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#151515] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="relative z-10">
                Add ${amount || '0.00'} to wallet
              </span>

              <span className="absolute left-[-120%] top-0 h-full w-[70%] skew-x-[-20deg] bg-white/15 transition-all duration-700 group-hover:left-[130%]" />

              <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-[#C5A880]" />
              <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-[#C5A880]" />
              <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#C5A880]" />
              <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#C5A880]" />
            </button>
          </section>
        </div>

        {/* Wallet information */}
        <section className="mt-6 rounded-[2rem] border border-[#D8D0C4] bg-white px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-medium text-[#0B0B0B]">
                How your wallet works
              </h3>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-[#77716A]">
                Use your wallet to pay for future stays. Refunds
                from eligible cancellations are automatically
                returned here.
              </p>
            </div>

            <Link
              to="/my-bookings"
              className="group inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#8B7355]"
            >
              View bookings
              <ArrowLeft
                size={14}
                className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Wallet

