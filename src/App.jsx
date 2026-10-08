
import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { BookingProvider } from './context/BookingContext'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'

import HotelDetails from './pages/HotelDetails/HotelDetails'
import Home from './pages/Home/Home'
import Hotels from './pages/Hotels/Hotels'
import NotFound from './pages/NotFound/NotFound'
import Checkout from './pages/Checkout/Checkout'
import MyBookings from './pages/MyBookings/MyBookings'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Account from './pages/Account/Account'
import Wishlist from './pages/Wishlist/Wishlist'
import Destinations from './pages/Destinations/Destinations'
import Experiences from './pages/Experiences/Experiences'
import Wallet from './pages/Wallet/Wallet'
import Payment from './pages/Payment/Payment'



import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'
import Preloader from './components/Preloader/Preloader'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <BookingProvider>
      <AuthProvider>
        <WishlistProvider>
          {isLoading && (
            <Preloader
              onComplete={() => setIsLoading(false)}
            />
          )}

          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/hotels"
                element={<Hotels />}
              />

              <Route
                path="/hotels/:id"
                element={<HotelDetails />}
              />

              <Route
                path="/checkout"
                element={<Checkout />}
              />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/payment" element={<Payment />} />
              

              

              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>

              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>

            <Footer />
          </BrowserRouter>
        </WishlistProvider>
      </AuthProvider>
    </BookingProvider>
  )
}

export default App

