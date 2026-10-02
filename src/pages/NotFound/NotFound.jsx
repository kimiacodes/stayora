
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-32">
      <div className="max-w-xl text-center">

        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Stayora
        </p>

        <p className="mt-8 font-serif text-8xl text-gray-900">
          404
        </p>

        <h1 className="mt-4 font-serif text-4xl text-gray-900 sm:text-5xl">
          Page not found.
        </h1>

        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-gray-500">
          The page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          to="/"
          className="mt-10 inline-block bg-gray-900 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gray-700"
        >
          Back to home
        </Link>

      </div>
    </main>
  )
}

export default NotFound

