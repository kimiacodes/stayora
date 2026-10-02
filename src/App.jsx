import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import { AuthProvider } from './context/AuthContext'



import HotelDetails from './pages/HotelDetails/HotelDetails'
import Home from './pages/Home/Home'
import Hotels from './pages/Hotels/Hotels'
import NotFound from './pages/NotFound/NotFound'
import Checkout from './pages/Checkout/Checkout'
import MyBookings from './pages/MyBookings/MyBookings'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Account from './pages/Account/Account'


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
        {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
  path="/my-bookings"
  element={
    <ProtectedRoute>
      <MyBookings />
    </ProtectedRoute>
  }
/>
        <Route path="/login"
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
<Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </AuthProvider>
    </BookingProvider>
  )
}

export default App
