import { createContext, useContext, useEffect, useState } from 'react'

const WishlistContext = createContext()

const STORAGE_KEY = 'stayora-wishlist'

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(STORAGE_KEY)

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : []
    } catch (error) {
      console.error('Could not load wishlist:', error)

      localStorage.removeItem(STORAGE_KEY)

      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(wishlist)
      )
    } catch (error) {
      console.error('Could not save wishlist:', error)
    }
  }, [wishlist])

  function addToWishlist(hotel) {
    setWishlist((currentWishlist) => {
      const alreadySaved = currentWishlist.some(
        (item) => item.id === hotel.id
      )

      if (alreadySaved) {
        return currentWishlist
      }

      return [...currentWishlist, hotel]
    })
  }

  function removeFromWishlist(hotelId) {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => item.id !== hotelId
      )
    )
  }

  function toggleWishlist(hotel) {
    setWishlist((currentWishlist) => {
      const alreadySaved = currentWishlist.some(
        (item) => item.id === hotel.id
      )

      if (alreadySaved) {
        return currentWishlist.filter(
          (item) => item.id !== hotel.id
        )
      }

      return [...currentWishlist, hotel]
    })
  }

  function isInWishlist(hotelId) {
    return wishlist.some(
      (item) => item.id === hotelId
    )
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}