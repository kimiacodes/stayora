
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('stayora-user')

      return savedUser
        ? JSON.parse(savedUser)
        : null
    } catch (error) {
      console.error('Could not load saved user:', error)

      localStorage.removeItem('stayora-user')

      return null
    }
  })

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(
          'stayora-user',
          JSON.stringify(user)
        )
      } else {
        localStorage.removeItem('stayora-user')
      }
    } catch (error) {
      console.error('Could not save user:', error)
    }
  }, [user])

  function login(userData) {
    setUser(userData)
  }

  function logout() {
    setUser(null)
  }

  function updateUser(updatedData) {
    setUser((currentUser) => ({
      ...currentUser,
      ...updatedData,
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

