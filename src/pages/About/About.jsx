import { Link } from 'react-router-dom'

import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'

const highlights = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Find carefully selected stays and destinations through a calm, considered browsing experience.',
  },
  {
    number: '02',
    title: 'Save',
    description:
      'Keep the places that catch your eye close with your personal collection of saved stays.',
  },
  {
    number: '03',
    title: 'Book',
    description:
      'Move from inspiration to reservation through a simple and focused booking journey.',
  },
]

const features = [
  {
    number: '01',
    title: 'Curated stays',
    text: 'A refined collection of hotels and destinations selected to make discovery feel effortless.',
  },
  {
    number: '02',
    title: 'Thoughtful discovery',
    text: 'Search, filter, sort, and explore without unnecessary steps getting between you and your next stay.',
  },
  {
    number: '03',
    title: 'Personal collection',
    text: 'Save the stays you love and build a collection of places you may want to experience.',
  },
  {
    number: '04',
    title: 'Detailed exploration',
    text: 'Explore photographs, amenities, ratings, reviews, pricing, and everything you need before booking.',
  },
  {
    number: '05',
    title: 'Focused checkout',
    text: 'A clean final step designed to keep your reservation clear, simple, and distraction-free.',
  },
  {
    number: '06',
    title: 'Your journey',
    text: 'Keep your reservations organized and return to your travel plans whenever you need them.',
  },
]

function About() {
  return (
    <main className="min-h-screen bg-[#F1EDE5] text-[#0B0B0B]">
      {/* Hero */}
<section className="bg-[#E8E1D5] px-6 py-24 sm:py-28 lg:px-10 lg:py-36">
  <div className="mx-auto max-w-7xl">
    <div className="flex min-h-[560px] flex-col justify-center">
      <ScrollReveal>
        <div className="max-w-5xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#927954]" />

            <p className="text-[10px] uppercase tracking-[0.4em] text-[#927954] sm:text-xs">
              The Stayora experience
            </p>
          </div>

          <h1 className="mt-8 font-serif text-6xl leading-[0.9] tracking-[-0.03em] text-[#0A0A09] sm:text-7xl md:text-8xl lg:text-[8.5rem]">
            Travel,
            <span className="block pl-8 italic text-[#927954] sm:pl-16 lg:pl-24">
              beautifully.
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-lg text-sm leading-8 text-[#6F6A62] sm:text-base">
              Stayora brings carefully selected stays, inspiring destinations,
              and a thoughtful booking experience together in one place.
            </p>

            <Link
            to="/hotels"
            className="
              group
              relative
              mt-10
              inline-flex
              h-[2.9em]
              w-[8.5em]
              items-center
              justify-end
              rounded-[11px]
              border-[0.2em]
              border-[#8B7355]
              bg-transparent
              text-[#0B0B0B]
              transition-all
              duration-500
              ease-in-out
              hover:bg-[#C5A880]
              hover:text-[#0B0B0B]
            "
          >

            <span className="mr-[1.5em] text-xs">
              Explore stays
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="
                absolute
                left-[0.8em]
                w-[1.6em]
                transition-all
                duration-500
                ease-in-out
                group-hover:translate-x-5px
              "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>

          </Link>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="mt-20 flex items-center gap-5 border-t border-[#CFC4B2] pt-5">
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#927954]">
            Stayora
          </span>

          <span className="h-px w-12 bg-[#CFC4B2]" />

          <span className="text-[9px] uppercase tracking-[0.3em] text-[#8A8379]">
            Hotel discovery & booking
          </span>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

      {/* Intro */}
      <section
        id="experience"
        className="px-6 py-24 sm:py-28 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <ScrollReveal>
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#927954]" />
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#927954]">
                    01 / The idea
                  </p>
                </div>

                <h2 className="mt-6 max-w-md font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                  More than
                  <span className="block italic text-[#927954]">
                    a booking.
                  </span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="max-w-3xl lg:pt-10">
                <p className="font-serif text-2xl leading-relaxed text-[#282621] sm:text-3xl">
                  We believe the journey should begin before you arrive.
                </p>

                <p className="mt-7 max-w-2xl text-sm leading-8 text-[#6F6A62] sm:text-base">
                  Stayora brings destinations, carefully selected stays, and a
                  thoughtful booking flow together in one refined experience.
                  Every interaction is designed to feel intentional, simple,
                  and quietly luxurious.
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-8 text-[#858077]">
                  No unnecessary noise. No complicated journey. Just a better
                  way to discover where you want to stay next.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-[#D5CCBC] bg-[#E8E1D5] px-6 py-24 sm:py-28 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-col gap-6 border-b border-[#CFC4B2] pb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#927954]" />

                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#927954]">
                    02 / Your journey
                  </p>
                </div>

                <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                  Simple by design.
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-[#756F66] sm:text-right">
                From the first search to the final reservation, every step has
                a purpose.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-[#CFC4B2] bg-[#CFC4B2] md:grid-cols-3">
            {highlights.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 100}>
                <div className="flex h-full min-h-75 flex-col bg-[#EEE8DE] p-7 transition duration-500 hover:bg-[#F5F0E8] sm:p-9 lg:p-10">
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-4xl text-[#B89B6D]">
                      {item.number}
                    </span>

                    <span className="mt-2 h-2 w-2 rounded-full bg-[#B89B6D]" />
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-serif text-3xl text-[#181713]">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#756F66]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="bg-[#0A0A09] px-6 py-24 sm:py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-24">
            <ScrollReveal>
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#C8AE82]" />

                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8AE82]">
                    03 / Design philosophy
                  </p>
                </div>

                <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] text-[#F4EFE6] sm:text-5xl lg:text-7xl">
                  Quiet luxury
                  <span className="block italic text-[#C8AE82]">
                    in every detail.
                  </span>
                </h2>

                <p className="mt-8 max-w-xl text-sm leading-8 text-[#918C83] sm:text-base">
                  The visual language of Stayora is built around warmth,
                  restraint, and contrast. Soft ivory surfaces meet deep
                  blacks, while champagne tones bring just enough character
                  to the interface.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="border border-[#F4EFE6]/10 bg-[#F4EFE6]/[0.025] p-7 sm:p-9">
                <p className="text-[9px] uppercase tracking-[0.35em] text-[#817B72]">
                  The visual language
                </p>

                <div className="mt-8 space-y-6">
                  {[
                    ['Warm neutrals', '#E8E1D5'],
                    ['Deep contrast', '#0A0A09'],
                    ['Champagne accent', '#C8AE82'],
                    ['Soft ivory', '#F4EFE6'],
                  ].map(([name, value]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between border-b border-[#F4EFE6]/10 pb-5"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="h-7 w-7 rounded-full border border-[#F4EFE6]/10"
                          style={{ backgroundColor: value }}
                        />

                        <span className="text-sm text-[#C0BAB0]">
                          {name}
                        </span>
                      </div>

                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#6F6A62]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 sm:py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#927954]" />

                <p className="text-[10px] uppercase tracking-[0.4em] text-[#927954]">
                  04 / Built around you
                </p>
              </div>

              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Everything you need.
                <span className="block italic text-[#927954]">
                  Nothing you don't.
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.number} delay={index * 70}>
                <div className="group flex h-full min-h-65 flex-col border border-[#D5CCBC] bg-[#F7F3EC] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B89B6D] hover:bg-[#FBF8F2] sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#927954]">
                      {feature.number}
                    </span>

                    <span className="h-1.5 w-1.5 rounded-full bg-[#B89B6D] transition-transform duration-300 group-hover:scale-150" />
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-serif text-2xl text-[#181713]">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#777168]">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#D5CCBC] bg-[#E8E1D5] px-6 py-24 sm:py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[#927954]" />

              <p className="text-[10px] uppercase tracking-[0.4em] text-[#927954]">
                Begin the journey
              </p>

              <span className="h-px w-10 bg-[#927954]" />
            </div>

            <h2 className="mt-7 font-serif text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
              Somewhere
              <span className="block italic text-[#927954]">
                worth going.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#716B62]">
              Discover your next stay and experience travel through the
              Stayora lens.
            </p>

            <div className="mt-10 flex justify-center">
              <Link
            to="/hotels"
            className="
              group
              relative
              mt-10
              inline-flex
              h-[2.9em]
              w-[8.5em]
              items-center
              justify-end
              rounded-[11px]
              border-[0.2em]
              border-[#8B7355]
              bg-transparent
              text-[#0B0B0B]
              transition-all
              duration-500
              ease-in-out
              hover:bg-[#C5A880]
              hover:text-[#0B0B0B]
            "
          >

            <span className="mr-[1.5em] text-xs">
              Explore stays
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="
                absolute
                left-[0.8em]
                w-[1.6em]
                transition-all
                duration-500
                ease-in-out
                group-hover:translate-x-5px
              "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>

          </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

export default About