
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  ArrowRight,
  Clock3,
  CheckCircle2,
} from 'lucide-react'

import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'

// Read the logged-in user from localStorage
const getLoggedInUser = () => {
  try {
    const savedUser = localStorage.getItem('stayora-user')
    return savedUser ? JSON.parse(savedUser) : null
  } catch {
    return null
  }
}

function Contact() {
  const [formData, setFormData] = useState(() => {
    const user = getLoggedInUser()

    const fullName = user
      ? [user.firstName, user.lastName]
          .filter(Boolean)
          .join(' ') || user.name || user.username || ''
      : ''

    return {
      name: fullName,
      email: user?.email || '',
      subject: 'General inquiry',
      message: '',
    }
  })

  const [status, setStatus] = useState('')

  const contactOptions = [
    {
      number: '01',
      icon: Mail,
      title: 'Email us',
      description:
        'Have a question or a special request? Send us a message and let us know how we can help.',
      detail: 'hello@stayora.com',
      link: 'mailto:hello@stayora.com',
      linkLabel: 'Send an email',
    },
    {
      number: '02',
      icon: MessageCircle,
      title: 'Booking assistance',
      description:
        'Need help with an existing reservation? Visit your bookings to review your stay details.',
      detail: 'Your reservations',
      link: '/my-bookings',
      linkLabel: 'View my bookings',
    },
    {
      number: '03',
      icon: MapPin,
      title: 'Discover Stayora',
      description:
        'Find your next memorable stay and explore destinations selected for a more thoughtful experience.',
      detail: 'Find your next stay',
      link: '/stays',
      linkLabel: 'Explore stays',
    },
  ]

  const expectations = [
    {
      icon: MessageCircle,
      title: 'Personal assistance',
      description:
        'Every question matters. Tell us what you need, and we will help you find the right direction.',
    },
    {
      icon: Clock3,
      title: 'A thoughtful response',
      description:
        'We aim to respond to inquiries as soon as possible, with clear and helpful information.',
    },
    {
      icon: CheckCircle2,
      title: 'Your experience matters',
      description:
        'From your first question to your next reservation, we want every interaction to feel effortless.',
    },
  ]

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const subject = encodeURIComponent(
      `[Stayora Contact] ${formData.subject}`
    )

    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )

    setStatus('opening')

    window.location.href = `mailto:hello@stayora.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="min-h-screen bg-[#F5F1EA] text-[#0B0B0B]">
      {/* Hero */}
      <section className="relative my-5 overflow-hidden border-b border-[#D8D0C4]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#C5A880]/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12 lg:pb-24 lg:pt-32">
          <ScrollReveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#C5A880]" />

              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] sm:text-xs">
                We are here for you
              </p>
            </div>

            <div className="mt-7 grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-16">
              <div>
                <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
                  Let’s start a
                  <span className="block italic text-[#8B7355]">
                    conversation,
                  </span>
                  thoughtfully.
                </h1>

                <p className="mt-7 max-w-xl text-sm leading-7 text-[#756D63] sm:text-base sm:leading-8">
                  Whether you have a question about your stay, need a little
                  guidance, or simply want to get in touch, we would love to
                  hear from you.
                </p>
              </div>

              <div className="border-l border-[#C5A880] pl-5 lg:mb-2">
                <p className="font-serif text-xl italic text-[#8B7355] sm:text-2xl">
                  Every great stay
                  <br />
                  begins with a conversation.
                </p>

                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#9B9286]">
                  The Stayora experience
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-3 border-y border-[#D8D0C4] py-6 sm:mt-16 sm:py-8">
              <div className="pr-3 sm:pr-6">
                <p className="font-serif text-xl sm:text-2xl">Personal</p>
                <p className="mt-2 text-[9px] uppercase leading-4 tracking-[0.16em] text-[#8B8175] sm:text-[10px] sm:tracking-[0.2em]">
                  Thoughtful support
                </p>
              </div>

              <div className="border-l border-[#D8D0C4] px-3 sm:px-6">
                <p className="font-serif text-xl sm:text-2xl">Simple</p>
                <p className="mt-2 text-[9px] uppercase leading-4 tracking-[0.16em] text-[#8B8175] sm:text-[10px] sm:tracking-[0.2em]">
                  Clear communication
                </p>
              </div>

              <div className="border-l border-[#D8D0C4] pl-3 sm:pl-6">
                <p className="font-serif text-xl sm:text-2xl">Considered</p>
                <p className="mt-2 text-[9px] uppercase leading-4 tracking-[0.16em] text-[#8B8175] sm:text-[10px] sm:tracking-[0.2em]">
                  Every detail matters
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact options */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <ScrollReveal>
          <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C5A880]" />

                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355]">
                  Get in touch
                </p>
              </div>

              <h2 className="mt-4 font-serif text-3xl font-normal sm:text-4xl">
                How can we help?
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#756D63]">
              Choose the option that works best for you. We are here to make
              every step of your Stayora journey feel easier.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {contactOptions.map((option) => {
            const Icon = option.icon

            return (
              <ScrollReveal key={option.number}>
                <article className="group flex h-full flex-col border border-[#D8D0C4] bg-white/60 p-6 transition-all duration-300 hover:border-[#C5A880] hover:bg-white sm:p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center border border-[#D8D0C4] text-[#8B7355] transition-colors duration-300 group-hover:border-[#C5A880] group-hover:bg-[#0B0B0B] group-hover:text-[#C5A880]">
                      <Icon size={20} strokeWidth={1.4} />
                    </div>

                    <span className="font-serif text-sm text-[#B5A58E]">
                      {option.number}
                    </span>
                  </div>

                  <h3 className="mt-7 font-serif text-2xl">
                    {option.title}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-7 text-[#756D63]">
                    {option.description}
                  </p>

                  <div className="mt-7 border-t border-[#D8D0C4] pt-5">
                    <p className="text-xs text-[#8B7355]">
                      {option.detail}
                    </p>

                    <Link
                      to={option.link}
                      className="group/link mt-4 inline-flex items-center gap-2 text-xs text-[#0B0B0B] transition-colors hover:text-[#8B7355]"
                    >
                      {option.linkLabel}

                      <ArrowRight
                        size={14}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* Contact form and additional contact methods */}
      <section className="border-y border-[#D8D0C4] bg-white/50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12 lg:py-24">
          {/* Left column */}
          <ScrollReveal>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C5A880]" />

                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355]">
                  A note to our team
                </p>
              </div>

              <h2 className="mt-5 max-w-md font-serif text-4xl font-normal leading-tight sm:text-5xl">
                Tell us what’s
                <span className="block italic text-[#8B7355]">
                  on your mind.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-8 text-[#756D63]">
                Leave us a message and share a little about what you need.
                Whether it’s a booking question or a general inquiry, we’ll
                help you find the right next step.
              </p>

              <div className="mt-9 space-y-6">
                {expectations.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D8D0C4] text-[#8B7355]">
                        <Icon size={18} strokeWidth={1.4} />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[#0B0B0B]">
                          {item.title}
                        </h3>

                        <p className="mt-2 max-w-sm text-xs leading-6 text-[#81786D]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Alternative contact methods */}
              <div className="mt-8 border-t border-[#D8D0C4] pt-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355]">
                  Prefer another way?
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {/* Phone */}
                  <div className="group relative">
                    <a
                      href="tel:+10000000000"
                      aria-label="Call Stayora"
                      className="flex h-12 w-12 items-center justify-center border border-[#D8D0C4] bg-white text-[#8B7355] transition-colors duration-300 hover:border-[#C5A880] hover:bg-[#0B0B0B] hover:text-[#C5A880] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                    >
                      <Phone size={19} strokeWidth={1.5} />
                    </a>

                    <div className="pointer-events-none absolute bottom-full left-0 z-20 mb-3 w-max max-w-[240px] -translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="border border-[#D8D0C4] bg-white px-4 py-3 shadow-lg">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#9B9286]">
                          Call us
                        </p>

                        <p className="mt-1 text-sm text-[#0B0B0B]">
                          +1 (000) 000-0000
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group relative">
                    <a
                      href="mailto:hello@stayora.com"
                      aria-label="Email Stayora"
                      className="flex h-12 w-12 items-center justify-center border border-[#D8D0C4] bg-white text-[#8B7355] transition-colors duration-300 hover:border-[#C5A880] hover:bg-[#0B0B0B] hover:text-[#C5A880] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                    >
                      <Mail size={19} strokeWidth={1.5} />
                    </a>

                    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-max max-w-[260px] -translate-x-1/2 -translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="border border-[#D8D0C4] bg-white px-4 py-3 shadow-lg">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#9B9286]">
                          Email us
                        </p>

                        <p className="mt-1 text-sm text-[#0B0B0B]">
                          hello@stayora.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="group relative">
                    <a
                      href="https://wa.me/10000000000"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Contact Stayora on WhatsApp"
                      className="flex h-12 w-12 items-center justify-center border border-[#D8D0C4] bg-white text-[#8B7355] transition-colors duration-300 hover:border-[#C5A880] hover:bg-[#0B0B0B] hover:text-[#C5A880] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                    >
                      <MessageCircle size={19} strokeWidth={1.5} />
                    </a>

                    <div className="pointer-events-none absolute bottom-full right-0 z-20 mb-3 w-max max-w-[240px] -translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="border border-[#D8D0C4] bg-white px-4 py-3 shadow-lg">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#9B9286]">
                          WhatsApp
                        </p>

                        <p className="mt-1 text-sm text-[#0B0B0B]">
                          Chat with our team
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-[#9B9286]">
                  Connect with us in the way that works best for you.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal>
            <div className="border border-[#D8D0C4] bg-[#F5F1EA] p-5 sm:p-8 lg:p-10">
              <div className="mb-8 border-b border-[#D8D0C4] pb-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355]">
                  Contact form
                </p>

                <h3 className="mt-3 font-serif text-3xl font-normal">
                  Send us a message
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#756D63]">
                  Fill in the details below and tell us how we can assist you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs text-[#5F584F]"
                    >
                      Full name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                      className="w-full border border-[#D8D0C4] bg-white px-4 py-3.5 text-sm text-[#0B0B0B] outline-none transition-colors placeholder:text-[#AAA195] focus:border-[#8B7355]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs text-[#5F584F]"
                    >
                      Email address
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full border border-[#D8D0C4] bg-white px-4 py-3.5 text-sm text-[#0B0B0B] outline-none transition-colors placeholder:text-[#AAA195] focus:border-[#8B7355]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-xs text-[#5F584F]"
                  >
                    What is this about?
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full appearance-none border border-[#D8D0C4] bg-white px-4 py-3.5 text-sm text-[#0B0B0B] outline-none transition-colors focus:border-[#8B7355]"
                  >
                    <option value="General inquiry">General inquiry</option>
                    <option value="Booking assistance">Booking assistance</option>
                    <option value="Existing reservation">
                      Existing reservation
                    </option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Something else</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs text-[#5F584F]"
                  >
                    Your message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a little about how we can help..."
                    rows={5}
                    required
                    className="w-full resize-none  border border-[#D8D0C4] bg-white px-4 py-3.5 text-sm leading-7 text-[#0B0B0B] outline-none transition-colors placeholder:text-[#AAA195] focus:border-[#8B7355]"
                  />
                </div>

                <div className="flex flex-col gap-4 border-t border-[#D8D0C4] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-xs leading-6 text-[#8B8175]">
                    By reaching out, you’re taking the first step toward a
                    more thoughtful stay.
                  </p>

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-3 border border-[#0B0B0B] bg-[#0B0B0B] px-6 py-3.5 text-sm text-white transition-colors duration-300 hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-[#0B0B0B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-4 sm:w-auto sm:min-w-52"
                  >
                    <span>Send your message</span>

                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>

                {status === 'opening' && (
                  <p
                    role="status"
                    className="text-xs leading-6 text-[#8B7355]"
                  >
                    Your email app should open with your message ready to send.
                    If it doesn’t, email us at hello@stayora.com.
                  </p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#F5F1EA] px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl text-center">
            {/* Label */}
            <div className="mb-7 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[#C5A880]" />

              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
                Your next journey
              </p>

              <span className="h-px w-10 bg-[#C5A880]" />
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl leading-[1.05] text-[#0B0B0B] sm:text-6xl lg:text-7xl">
              Let’s make it
              <span className="block italic text-[#8B7355]">
                memorable.
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-[#756C62] sm:text-base">
              Have a question or planning your next escape?
              We’re here to help you find the right place for
              your next unforgettable journey.
            </p>

            {/* CTA */}
            <Link
              to="/hotels"
              className="group mt-10 inline-flex items-center justify-center gap-4 border-none bg-[#0B0B0B] px-6 py-3 text-sm text-white shadow-[6px_6px_0_#8B7355] transition-all duration-150 ease-in-out hover:shadow-[10px_10px_0_#C5A880] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-4 [transform:skewX(-15deg)]"
            >
              <span className="[transform:skewX(15deg)]">
                Explore stays
              </span>

              <span className="flex w-5 items-center justify-center transition-all duration-150 group-hover:mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 shrink-0 -translate-x-3 transition-all duration-150 group-hover:translate-x-0 group-hover:animate-[color_anim_0.6s_ease-in-out_infinite]"
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
        </ScrollReveal>
      </section>
    </main>
  )
}

export default Contact
