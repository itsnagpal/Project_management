import { createContext, useContext, useState, useEffect } from "react"
import { users } from "../data/userMockData"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("currentUser")
    if (stored) {
      setCurrentUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  function login(email, password) {
    const foundUser = users.find(u => u.email === email)

    if (!foundUser) {
      return { success: false, message: "User does not exist" }
    }
    if (foundUser.password !== password) {
      return { success: false, message: "Incorrect password" }
    }

    const { password: _password, ...safeUser } = foundUser
    setCurrentUser(safeUser)
    localStorage.setItem("currentUser", JSON.stringify(safeUser))

    return { success: true, user: safeUser }
  }

  function logout() {
    setCurrentUser(null)
    const itemsToRemove = ["tasks","projects","currentUser"]
    itemsToRemove.forEach(key=>localStorage.removeItem(key))
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout
  }

  if (isLoading) {
    return null
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}