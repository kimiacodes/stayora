
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CreditCard,
  WalletCards,
  ShieldCheck,
  CircleCheck,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'


import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'



function Payment() {
  const [openFaq, setOpenFaq] = useState(null)

  const steps = [
    {
      number: '01',
      title: 'Choose your stay',
      description:
        'Select your destination, dates, guests, and the stay that fits your plans.',
    },
    {
      number: '02',
      title: 'Select payment',
      description:
        'Choose between online payment or your available Stayora Wallet balance.',
    },
    {
      number: '03',
      title: 'Confirm your booking',
      description:
        'Review your details and complete your payment to receive your booking confirmation.',
    },
  ]

  const refundRules = [
    {
      days: 'More than 20 days',
      percentage: '95%',
    },
    {
      days: '14–20 days',
      percentage: '85%',
    },
    {
      days: 'Less than 14 days',
      percentage: '0%',
    },
  ]

  const benefits = [
    'Clear pricing with no hidden booking fees',
    'Full payment confirmation at checkout',
    'Wallet refunds from eligible cancellations',
    'Booking details available in My Bookings',
  ]

  const faqs = [
    {
      question: 'Can I pay with my Stayora Wallet?',
      answer:
        'Yes. If your wallet balance is enough, you can use it to pay the full reservation amount at checkout.',
    },
    {
      question: 'What happens if I cancel my reservation?',
      answer:
        'Eligible cancellation refunds are added to your Stayora Wallet according to the cancellation policy.',
    },
    {
      question: 'Can I see how much I paid?',
      answer:
        'Yes. Your booking details, total amount, and payment method are available in My Bookings.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#F5F1EA] text-[#0B0B0B]">

      {/* Hero */}
      <section className="px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-6xl">

          <ScrollReveal direction="up">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#C5A880]" />

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
                  PAYMENT
                </p>
              </div>

              <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Simple payment,
                <br />
                <span className="text-[#8B7355]">
                  thoughtfully designed.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-[#756D63] sm:text-base">
                At Stayora, booking your stay should feel as effortless as
                choosing it. We keep payment simple, transparent, and easy
                to understand from the moment you select your stay to the
                moment your reservation is confirmed.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            delay={150}
          >
            <div className="mt-16 grid border-y border-[#D8D0C4] sm:grid-cols-3">

              <div className="border-b border-[#D8D0C4] py-7 sm:border-b-0 sm:border-r sm:px-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9B9286]">
                  TRANSPARENT
                </p>

                <p className="mt-2 font-serif text-xl">
                  Know what you pay
                </p>
              </div>

              <div className="border-b border-[#D8D0C4] py-7 sm:border-b-0 sm:border-r sm:px-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9B9286]">
                  FLEXIBLE
                </p>

                <p className="mt-2 font-serif text-xl">
                  Choose how you pay
                </p>
              </div>

              <div className="py-7 sm:px-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9B9286]">
                  ORGANIZED
                </p>

                <p className="mt-2 font-serif text-xl">
                  Everything in one place
                </p>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Payment */}
      <section className="border-y border-[#D8D0C4] bg-white px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">

          <ScrollReveal direction="up">
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
                PAYMENT
              </p>

              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                Payment should feel effortless.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#756D63]">
                Choose the payment method that works best for your stay.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">

            <ScrollReveal
              direction="left"
              delay={100}
            >
              <article className="border border-[#D8D0C4] bg-[#F5F1EA] p-7 transition duration-300 hover:border-[#C5A880] sm:p-8">
                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C5A880] bg-white text-[#8B7355]">
                    <CreditCard
                      size={20}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl">
                      Pay Online
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#756D63]">
                      Pay the full amount securely at checkout.
                    </p>
                  </div>

                </div>
              </article>
            </ScrollReveal>

            <ScrollReveal
              direction="right"
              delay={200}
            >
              <article className="border border-[#D8D0C4] bg-[#F5F1EA] p-7 transition duration-300 hover:border-[#C5A880] sm:p-8">
                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C5A880] bg-white text-[#8B7355]">
                    <WalletCards
                      size={20}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl">
                      Stayora Wallet
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#756D63]">
                      Use your available wallet balance instantly.
                    </p>
                  </div>

                </div>
              </article>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <ScrollReveal direction="left">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
                  HOW IT WORKS
                </p>

                <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                  From selection
                  <br />
                  to confirmation.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#756D63]">
                  We keep the payment process focused on the things that
                  matter: your stay, your dates, and a clear confirmation
                  when everything is complete.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal
              direction="right"
              delay={150}
            >
              <div className="border-t border-[#D8D0C4]">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className="grid gap-5 border-b border-[#D8D0C4] py-7 sm:grid-cols-[70px_1fr]"
                  >
                    <span className="text-xs tracking-[0.15em] text-[#C5A880]">
                      {step.number}
                    </span>

                    <div>
                      <h3 className="font-serif text-xl">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-lg text-sm leading-7 text-[#756D63]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* Cancellation & Refund */}
      <section className="border-y border-[#D8D0C4] bg-white px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">

          <ScrollReveal direction="up">
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
                CANCELLATION & REFUND
              </p>

              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                Know your refund before you cancel.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#756D63]">
                Your refund depends on how far in advance you cancel.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 border-t border-[#D8D0C4]">

            {refundRules.map((rule, index) => (
              <ScrollReveal
                key={rule.days}
                direction="right"
                delay={index * 100}
              >
                <div className="flex flex-col gap-4 border-b border-[#D8D0C4] py-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[#756D63]">
                    {rule.days} before check-in
                  </p>

                  <p className="font-serif text-3xl text-[#8B7355]">
                    {rule.percentage}

                    <span className="ml-2 text-sm text-[#756D63]">
                      refund
                    </span>
                  </p>
                </div>
              </ScrollReveal>
            ))}

          </div>

        </div>
      </section>

      {/* Wallet */}
      <section className="bg-[#0B0B0B] px-5 py-20 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">

            <ScrollReveal direction="left">
              <div>
                <div className="flex items-center gap-3">

                  <WalletCards
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#C5A880]"
                  />

                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">
                    STAYORA WALLET
                  </p>

                </div>

                <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
                  Your refund can stay
                  <span className="text-[#C5A880]">
                    {' '}with you.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
                  Eligible refunds are added to your Stayora Wallet
                  for a future reservation.
                </p>

                <Link
                  to="/wallet"
                  className="mt-8 inline-flex items-center gap-3 border border-[#C5A880] px-6 py-3.5 text-[10px] uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#C5A880] hover:text-[#0B0B0B]"
                >
                  View wallet

                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal
              direction="right"
              delay={150}
            >
              <div className="border border-white/10 p-7 sm:p-9">

                <div className="flex items-center gap-3 border-b border-white/10 pb-5">

                  <ShieldCheck
                    size={19}
                    strokeWidth={1.5}
                    className="text-[#C5A880]"
                  />

                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                    BUILT AROUND CLARITY
                  </p>

                </div>

                <div className="pt-5">
                  {benefits.map((benefit, index) => (
                    <ScrollReveal
                      key={benefit}
                      direction="right"
                      delay={index * 80}
                    >
                      <div className="flex gap-3 border-b border-white/10 py-4 last:border-b-0">
                        <CircleCheck
                          size={17}
                          strokeWidth={1.5}
                          className="mt-0.5 shrink-0 text-[#C5A880]"
                        />

                        <p className="text-sm leading-6 text-white/65">
                          {benefit}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <ScrollReveal direction="left">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
                  FAQ
                </p>

                <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                  Frequently asked
                  <br />
                  questions.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#756D63]">
                  A few simple answers about payments, refunds, and your
                  booking information.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal
              direction="right"
              delay={150}
            >
              <div className="border-t border-[#D8D0C4]">

                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index

                  return (
                    <div
                      key={faq.question}
                      className="border-b border-[#D8D0C4]"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq(isOpen ? null : index)
                        }
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span className="font-serif text-lg sm:text-xl">
                          {faq.question}
                        </span>

                        <ChevronDown
                          size={18}
                          strokeWidth={1.5}
                          className={`shrink-0 text-[#8B7355] transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ${
                          isOpen
                            ? 'grid-rows-[1fr] pb-6'
                            : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-2xl text-sm leading-7 text-[#756D63]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* Security */}
      <section className="bg-[#F8F5F0] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">

          <ScrollReveal direction="up">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end">

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
                  SECURITY & CLARITY
                </p>

                <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
                  A checkout experience
                  <br />
                  without the confusion.
                </h2>
              </div>

              <p className="max-w-lg text-sm leading-7 text-[#756D63] lg:justify-self-end">
                Before completing your reservation, Stayora gives you a
                clear view of your dates, guests, total price, and selected
                payment method. Your booking is only confirmed after the
                payment step is completed successfully.
              </p>

            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            delay={150}
          >
            <div className="mt-12 border-t border-[#D8D0C4] pt-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="font-serif text-xl">
                    Ready to find your next stay?
                  </p>

                  <p className="mt-1 text-sm text-[#756D63]">
                    Explore our handpicked destinations.
                  </p>
                </div>


<Link
  to="/hotels"
  className="
    group
    mt-10
    inline-flex
    items-center
    justify-center
    gap-4
    border-none
    bg-[#0B0B0B]
    px-6
    py-3
    text-sm
    text-white
    shadow-[6px_6px_0_#8B7355]
    transition-all
    duration-150
    ease-in-out
    hover:shadow-[10px_10px_0_#C5A880]
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#C5A880]
    focus-visible:ring-offset-4
    focus-visible:ring-offset-[#0B0B0B]
    [transform:skewX(-15deg)]
  "
>
  <span className="[transform:skewX(15deg)]">
    Explore stays
  </span>

  <span
    className="
      flex
      w-5
      items-center
      justify-center
      transition-all
      duration-150
      group-hover:mr-3
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="
        w-5
        shrink-0
        -translate-x-3
        transition-all
        duration-150
        group-hover:translate-x-0
        group-hover:animate-[color_anim_0.6s_ease-in-out_infinite]
      "
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
</Link>


              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D8D0C4] bg-[#F5F1EA] px-5 py-6 sm:px-8">
        <ScrollReveal direction="up">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8B7355] sm:flex-row sm:items-center sm:justify-between">
            <span>STAYORA</span>
            <span>YOUR STAY, YOUR WAY</span>
          </div>
        </ScrollReveal>
      </footer>

    </main>
  )
}

export default Payment

