import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { hotels } from '../../data/hotels'
import { reviews as initialReviews } from '../../data/reviews'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal'
import { useBooking } from '../../context/BookingContext'
import { useAuth } from '../../context/AuthContext'
import CoverflowCarousel from '../../components/ui/CoverflowCarousel'

function HotelDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setBooking } = useBooking()
  const { user } = useAuth()

  const today = new Date().toISOString().split('T')[0]

  const [searchParams] = useSearchParams()

  const [checkIn, setCheckIn] = useState(
    searchParams.get('checkIn') || ''
  )

  const [checkOut, setCheckOut] = useState(
    searchParams.get('checkOut') || ''
  )

  const [guests, setGuests] = useState(
    Number(searchParams.get('guests')) || 1
  )

  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem('stayora-reviews')

      if (savedReviews) {
        return JSON.parse(savedReviews)
      }

      return initialReviews
    } catch {
      return initialReviews
    }
  })

  const [reviewRating, setReviewRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [editingReviewId, setEditingReviewId] = useState(null)
  const [visibleReviews, setVisibleReviews] = useState(5)

  const hotel = hotels.find(
    (hotel) => hotel.id === Number(id)
  )

  useEffect(() => {
    localStorage.setItem(
      'stayora-reviews',
      JSON.stringify(reviews)
    )
  }, [reviews])

  useEffect(() => {
    setVisibleReviews(5)
    setEditingReviewId(null)
  }, [id])

  if (!hotel) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F1EA] px-6 py-32">
        <div className="max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
            Stayora
          </p>

          <h1 className="mt-5 font-serif text-5xl text-[#0B0B0B] sm:text-6xl">
            Stay not found.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-gray-600">
            We couldn't find the stay you're looking for.
            It may have been removed or the link may be incorrect.
          </p>

          <Link
            to="/hotels"
            className="mt-10 inline-block bg-[#0B0B0B] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#8B7355]"
          >
            Explore stays
          </Link>
        </div>
      </main>
    )
  }

  const hotelReviews = reviews.filter(
    (review) => review.hotelId === hotel.id
  )

  const displayedReviews = hotelReviews.slice(
    0,
    visibleReviews
  )

  const hasMoreReviews =
    visibleReviews < hotelReviews.length

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: hotelReviews.filter(
      (review) => review.rating === rating
    ).length,
  }))

  const totalReviews = hotelReviews.length

  let nights = 0

  if (checkIn && checkOut) {
    const start = new Date(checkIn)
    const end = new Date(checkOut)

    const difference = end - start

    nights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )
  }

  const totalPrice = nights * hotel.price

  const currentUserId =
    user?.id ||
    user?.email ||
    user?.username ||
    null

  const currentUserName =
    [user?.firstName, user?.lastName]
      .filter(Boolean)
      .join(' ') ||
    user?.name ||
    user?.username ||
    'Guest'

  const handleReviewSubmit = () => {
    const trimmedText = reviewText.trim()

    if (!currentUserId) {
      navigate('/login')
      return
    }

    if (!trimmedText) {
      return
    }

    const newReview = {
      id: Date.now(),
      hotelId: hotel.id,
      userId: currentUserId,
      name: currentUserName,
      rating: reviewRating,
      date: new Date().toLocaleDateString(
        'en-US',
        {
          month: 'long',
          year: 'numeric',
        }
      ),
      comment: trimmedText,
    }

    setReviews((currentReviews) => [
      newReview,
      ...currentReviews,
    ])

    setReviewRating(5)
    setReviewText('')
  }

  const handleEditReview = (review) => {
    setEditingReviewId(review.id)
  }

  const handleUpdateReview = (
    reviewId,
    rating,
    comment
  ) => {
    const trimmedComment = comment.trim()

    if (!trimmedComment) {
      return
    }

    setReviews((currentReviews) =>
      currentReviews.map((review) => {
        if (
          review.id === reviewId &&
          review.userId === currentUserId
        ) {
          return {
            ...review,
            rating,
            comment: trimmedComment,
          }
        }

        return review
      })
    )

    setEditingReviewId(null)
  }

  const handleDeleteReview = (reviewId) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this review?'
    )

    if (!shouldDelete) {
      return
    }

    setReviews((currentReviews) =>
      currentReviews.filter(
        (review) =>
          !(
            review.id === reviewId &&
            review.userId === currentUserId
          )
      )
    )

    if (editingReviewId === reviewId) {
      setEditingReviewId(null)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F1EA]">

      {/* =========================
          Gallery
      ========================== */}

      <section className="px-5 pt-20 md:px-10 lg:pt-25">
        <div className="mx-auto max-w-6xl">

          <ScrollReveal direction="up">

            <div className="relative">

              <CoverflowCarousel
                items={hotel.gallery.map((image, index) => ({
                  id: String(index),
                  image,
                  alt: `${hotel.name} ${index + 1}`,
                }))}
                loop
              />

              <div className="pointer-events-none absolute left-6 top-6 z-40">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/80 sm:text-xs">
                  {hotel.city}, {hotel.country}
                </p>
              </div>

            </div>

          </ScrollReveal>

        </div>
      </section>


      {/* =========================
          Hotel Information + Booking
      ========================== */}

      <section className="px-6 py-20 lg:px-10 lg:py-28">

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_380px]">

          <ScrollReveal direction="left">

            <div className="lg:pt-4">

              <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
                {hotel.city}, {hotel.country}
              </p>

              <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] text-[#0B0B0B] sm:text-6xl lg:text-7xl">
                {hotel.name}
              </h1>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">

                <span className="flex items-center gap-2 text-[#8B7355]">
                  <span className="text-base">
                    ★
                  </span>

                  <span className="font-medium text-[#0B0B0B]">
                    {hotel.rating}
                  </span>
                </span>

                <span className="h-1 w-1 rounded-full bg-[#C5A880]" />

                <span className="text-gray-600">
                  From ${hotel.price} / night
                </span>

              </div>

              <div className="mt-12 max-w-2xl border-l border-[#C5A880] pl-6">

                <p className="text-base leading-8 text-gray-600">
                  {hotel.description}
                </p>

              </div>

              <div className="mt-12 flex items-center gap-4">

                <span className="h-px w-12 bg-[#C5A880]" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                  Stayora Collection
                </span>

              </div>

            </div>

          </ScrollReveal>


          {/* Booking Card */}

          <ScrollReveal direction="right" delay={200}>

            <div className="h-fit border border-[#D8D0C4] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-8">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-[#8B7355]">
                    Your stay
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    Reserve your experience
                  </p>

                </div>

                

              </div>


              <div className="mt-7 border-b border-[#E5DED3] pb-7">

                <span className="font-serif text-4xl text-[#0B0B0B]">
                  ${hotel.price}
                </span>

                <span className="ml-2 text-sm text-gray-500">
                  / night
                </span>

              </div>


              {/* Check in */}

              <div className="mt-7">

                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                  Check in
                </label>

                <input
                  type="date"
                  value={checkIn}
                  min={today}
                  onChange={(e) => {
                    const value = e.target.value

                    setCheckIn(value)

                    if (checkOut && value >= checkOut) {
                      setCheckOut('')
                    }
                  }}
                  className="mt-3 w-full border-b border-[#D8D0C4] bg-transparent pb-3 text-sm text-[#0B0B0B] outline-none transition focus:border-[#8B7355]"
                />

              </div>


              {/* Check out */}

              <div className="mt-7">

                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                  Check out
                </label>

                <input
                  type="date"
                  value={checkOut}
                  min={
                    checkIn
                      ? new Date(
                          new Date(checkIn).getTime() +
                            24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .split('T')[0]
                      : today
                  }
                  onChange={(e) =>
                    setCheckOut(e.target.value)
                  }
                  className="mt-3 w-full border-b border-[#D8D0C4] bg-transparent pb-3 text-sm text-[#0B0B0B] outline-none transition focus:border-[#8B7355]"
                />

              </div>


              {/* Guests */}

              <div className="mt-7">

                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                  Guests
                </label>

                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) =>
                    setGuests(Number(e.target.value))
                  }
                  className="mt-3 w-full border-b border-[#D8D0C4] bg-transparent pb-3 text-sm text-[#0B0B0B] outline-none transition focus:border-[#8B7355]"
                />

              </div>


              {/* Summary */}

              {nights > 0 && (

                <div className="mt-8 border-t border-[#E5DED3] pt-6">

                  <div className="flex justify-between text-sm text-gray-500">

                    <span>
                      ${hotel.price} × {nights} nights
                    </span>

                    <span className="text-[#0B0B0B]">
                      ${totalPrice}
                    </span>

                  </div>

                  <div className="mt-5 flex items-end justify-between">

                    <span className="text-sm uppercase tracking-[0.15em] text-gray-500">
                      Total
                    </span>

                    <span className="font-serif text-2xl text-[#0B0B0B]">
                      ${totalPrice}
                    </span>

                  </div>

                </div>

              )}


              {/* Book */}

              <button
                type="button"
                disabled={nights <= 0}
                onClick={() => {
                  setBooking({
                    hotelId: hotel.id,
                    checkIn,
                    checkOut,
                    guests,
                  })

                  navigate(
                    `/checkout?hotel=${hotel.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
                  )
                }}
                className="mt-8 w-full bg-[#0B0B0B] px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#8B7355] disabled:cursor-not-allowed disabled:bg-[#D8D0C4]"
              >
                Book this stay
              </button>

              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.15em] text-gray-400">
                Secure reservation
              </p>

            </div>

          </ScrollReveal>

        </div>

      </section>


      {/* =========================
          Amenities
      ========================== */}

      <section className="border-t border-[#D8D0C4] bg-white px-6 py-20 lg:px-10 lg:py-24">

        <ScrollReveal direction="up">

          <div className="mx-auto max-w-7xl">

            <div className="max-w-2xl">

              <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
                Amenities
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#0B0B0B] sm:text-5xl">
                Everything you need.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
                Thoughtfully selected amenities designed to make your stay
                comfortable, relaxing and memorable.
              </p>

            </div>

            <div className="mt-14 grid border-t border-[#E5DED3] sm:grid-cols-2 lg:grid-cols-3">

              {hotel.amenities.map((amenity, index) => (

                <div
                  key={amenity}
                  className="group flex items-center gap-5 border-b border-[#E5DED3] px-2 py-6 transition hover:bg-[#F5F1EA] sm:px-5"
                >

                  <span className="font-serif text-sm text-[#C5A880]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="text-sm text-gray-700 transition group-hover:text-[#0B0B0B]">
                    {amenity}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </ScrollReveal>


        <div className="flex justify-center mx-auto max-w-7xl">

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

      </section>


      {/* =========================
          Guest Reviews
      ========================== */}

      <section className="border-t border-[#D8D0C4] bg-[#F5F1EA] px-6 py-20 lg:px-10 lg:py-28">

        <ScrollReveal direction="up">

          <div className="mx-auto max-w-7xl">

            {/* Header */}

            <div>

              <p className="text-xs uppercase tracking-[0.3em] text-[#8B7355]">
                Guest Reviews
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#0B0B0B] sm:text-5xl">
                What our guests say.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
                Discover what previous guests experienced during their stay
                at {hotel.name}.
              </p>

            </div>


            {/* Rating Overview */}

            <div className="mt-14 grid border-y border-[#D8D0C4] md:grid-cols-[220px_1fr]">

              <div className="flex flex-col items-center justify-center border-b border-[#D8D0C4] px-6 py-10 md:border-b-0 md:border-r">

                <span className="font-serif text-6xl text-[#0B0B0B]">
                  {hotel.rating}
                </span>

                <div className="mt-3 flex gap-1 text-lg text-[#C5A880]">
                  ★★★★★
                </div>

                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  {totalReviews} guest reviews
                </p>

              </div>


              <div className="px-2 py-8 sm:px-8 lg:px-12">

                <div className="max-w-xl space-y-4">

                  {ratingCounts.map((item) => {

                    const percentage =
                      totalReviews > 0
                        ? (item.count / totalReviews) * 100
                        : 0

                    return (

                      <div
                        key={item.rating}
                        className="flex items-center gap-4"
                      >

                        <span className="w-7 text-xs text-gray-500">
                          {item.rating}★
                        </span>

                        <div className="h-1.5 flex-1 overflow-hidden bg-[#D8D0C4]">

                          <div
                            className="h-full bg-[#C5A880] transition-all duration-700"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                        <span className="w-5 text-right text-xs text-gray-400">
                          {item.count}
                        </span>

                      </div>

                    )
                  })}

                </div>

              </div>

            </div>


            {/* Add Review */}

            <div className="mt-14 border border-[#D8D0C4] bg-white p-6 sm:p-8">

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-[#8B7355]">
                    Share your experience
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    {currentUserId
                      ? `Writing as ${currentUserName}`
                      : 'Sign in to share your experience.'}
                  </p>

                </div>

                {!currentUserId && (

                  <Link
                    to="/login"
                    className="text-xs uppercase tracking-[0.15em] text-[#8B7355] underline underline-offset-4"
                  >
                    Sign in
                  </Link>

                )}

              </div>


              {currentUserId && (

                <>

                  {/* Rating */}

                  <div className="mt-8">

                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7355]">
                      Your rating
                    </p>

                    <div className="mt-3 flex gap-1">

                      {Array.from({ length: 5 }).map(
                        (_, index) => {

                          const rating = index + 1

                          return (

                            <button
                              key={rating}
                              type="button"
                              onClick={() =>
                                setReviewRating(rating)
                              }
                              aria-label={`Rate ${rating} out of 5`}
                              className="text-2xl transition-transform duration-200 hover:scale-110"
                            >

                              <span
                                className={
                                  rating <= reviewRating
                                    ? 'text-[#C5A880]'
                                    : 'text-[#D8D0C4]'
                                }
                              >
                                ★
                              </span>

                            </button>

                          )
                        }
                      )}

                    </div>

                  </div>


                  {/* Text */}

      <textarea
  value={reviewText}
  onChange={(e) => setReviewText(e.target.value)}
  placeholder="Write your review..."
  
  className="mt-7 h-20 w-full resize-none border border-[#D8D0C4] bg-[#F5F1EA] p-4 text-sm leading-7 text-[#0B0B0B] outline-none transition placeholder:text-gray-400 focus:border-[#8B7355] sm:h-40"
/>


                  <div className="mt-5 flex justify-end">

                    <button
                      type="button"
                      disabled={!reviewText.trim()}
                      onClick={handleReviewSubmit}
                      className="bg-[#0B0B0B] px-6 py-3 text-xs uppercase tracking-[0.15em] text-white transition hover:bg-[#8B7355] disabled:cursor-not-allowed disabled:bg-[#D8D0C4]"
                    >
                      Publish review
                    </button>

                  </div>

                </>

              )}

            </div>


            {/* Reviews List */}

            <div className="mt-14">

              <div className="mb-8 flex items-center justify-between">

                <p className="text-xs uppercase tracking-[0.2em] text-[#8B7355]">
                  Recent experiences
                </p>

                <span className="text-xs text-gray-400">
                  {totalReviews} reviews
                </span>

              </div>


              {/* Reviews */}

              <div className="border-t border-[#D8D0C4]">

                {displayedReviews.map((review) => {

                  const isOwner =
                    currentUserId &&
                    review.userId === currentUserId

                  const isEditing =
                    editingReviewId === review.id

                  return (
                    <ReviewItem
                      key={review.id}
                      review={review}
                      isOwner={isOwner}
                      isEditing={isEditing}
                      onEdit={handleEditReview}
                      onUpdate={handleUpdateReview}
                      onDelete={handleDeleteReview}
                      onCancel={() =>
                        setEditingReviewId(null)
                      }
                    />
                  )
                })}

              </div>


              {/* Read More */}

              {hasMoreReviews && (

                <div className="mt-10 flex justify-center">

                  <button
                    type="button"
                    onClick={() =>
                      setVisibleReviews(
                        (current) => current + 5
                      )
                    }
                    className="group inline-flex items-center gap-3 border border-[#8B7355] px-7 py-3 text-xs uppercase tracking-[0.18em] text-[#0B0B0B] transition duration-300 hover:bg-[#C5A880]"
                  >

                    Read more reviews

                    <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                      ↓
                    </span>

                  </button>

                </div>

              )}

            </div>


            <div className="mt-10 flex items-center gap-4">

              <span className="h-px w-12 bg-[#C5A880]" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                Stayora Guest Experience
              </span>

            </div>

          </div>

        </ScrollReveal>

      </section>

    </main>
  )
}


/* =========================
   Review Item
========================== */

function ReviewItem({
  review,
  isOwner,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
}) {
  const [editRating, setEditRating] = useState(review.rating)
  const [editComment, setEditComment] = useState(review.comment)

  useEffect(() => {
    if (isEditing) {
      setEditRating(review.rating)
      setEditComment(review.comment)
    }
  }, [
    isEditing,
    review.rating,
    review.comment,
  ])

  if (isEditing) {
    return (
      <article className="border-b border-[#D8D0C4] py-8 sm:py-10">

        <div className="flex items-start justify-between gap-5">

          <div>

            <h3 className="text-sm font-medium text-[#0B0B0B]">
              {review.name}
            </h3>

            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gray-400">
              Editing your review
            </p>

          </div>

        </div>


        {/* Rating */}

        <div className="mt-6 flex gap-1">

          {Array.from({ length: 5 }).map(
            (_, index) => {

              const rating = index + 1

              return (

                <button
                  key={rating}
                  type="button"
                  onClick={() =>
                    setEditRating(rating)
                  }
                  aria-label={`Rate ${rating} out of 5`}
                  className="text-2xl transition-transform duration-200 hover:scale-110"
                >

                  <span
                    className={
                      rating <= editRating
                        ? 'text-[#C5A880]'
                        : 'text-[#D8D0C4]'
                    }
                  >
                    ★
                  </span>

                </button>

              )
            }
          )}

        </div>


        {/* Edit textarea */}

        <textarea
          value={editComment}
          onChange={(e) =>
            setEditComment(e.target.value)
          }
          rows="5"
          className="mt-5 w-full resize-none border border-[#D8D0C4] bg-white p-4 text-sm leading-7 text-[#0B0B0B] outline-none transition focus:border-[#8B7355]"
        />


        {/* Edit actions */}

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onCancel}
            className="border border-[#D8D0C4] px-6 py-3 text-xs uppercase tracking-[0.15em] text-gray-500 transition hover:border-[#8B7355] hover:text-[#0B0B0B]"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!editComment.trim()}
            onClick={() =>
              onUpdate(
                review.id,
                editRating,
                editComment
              )
            }
            className="bg-[#0B0B0B] px-6 py-3 text-xs uppercase tracking-[0.15em] text-white transition hover:bg-[#8B7355] disabled:cursor-not-allowed disabled:bg-[#D8D0C4]"
          >
            Update review
          </button>

        </div>

      </article>
    )
  }

  return (
    <article className="border-b border-[#D8D0C4] py-8 sm:py-10">

      {/* Review Header */}

      <div className="flex items-start justify-between gap-5">

        {/* User */}

        <div>

          <h3 className="text-sm font-medium text-[#0B0B0B]">
            {review.name}
          </h3>

          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gray-400">
            {review.date}
          </p>

        </div>


        {/* Rating + Actions */}

        <div className="flex shrink-0 items-center gap-5">

          {/* Stars */}

          <div className="flex gap-0.5 text-sm">

            {Array.from({ length: 5 }).map(
              (_, index) => (

                <span
                  key={index}
                  className={
                    index < review.rating
                      ? 'text-[#C5A880]'
                      : 'text-[#D8D0C4]'
                  }
                >
                  ★
                </span>

              )
            )}

          </div>


          {/* Edit / Delete */}

          {isOwner && (

            <div className="flex items-center gap-1">

              <button
                type="button"
                onClick={() => onEdit(review)}
                aria-label="Edit review"
                className="group flex h-8 w-8 items-center justify-center"
              >

                <img
  src="/edit.svg"
  alt="Edit"
  className="brightness-0 h-[17px] w-[17px] opacity-100 transition duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:sepia group-hover:saturate-[8] group-hover:hue-rotate-[320deg]"
/>

              </button>


              <button
                type="button"
                onClick={() => onDelete(review.id)}
                aria-label="Delete review"
                className="group flex h-8 w-8 items-center justify-center"
              >

                <img
  src="/bin.svg"
  alt="Delete"
  className=" brightness-0 h-[17px] w-[17px] opacity-100 transition duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:sepia group-hover:saturate-[8] group-hover:hue-rotate-[320deg]"
/>

              </button>

            </div>

          )}

        </div>

      </div>


      {/* Comment */}

      <p className="mt-6 max-w-4xl text-sm leading-7 text-gray-600">
        “{review.comment}”
      </p>

    </article>
  )
}

export default HotelDetails