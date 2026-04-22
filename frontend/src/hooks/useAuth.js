import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * Custom hook to use auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

// Additional auth helper functions
export const useUser = () => {
  const { user } = useAuth()
  return user
}

export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

export const useIsAdmin = () => {
  const { isAdmin } = useAuth()
  return isAdmin
}

export const useLogin = () => {
  const { login } = useAuth()
  return login
}

export const useLogout = () => {
  const { logout } = useAuth()
  return logout
}

export const useAuthLoading = () => {
  const { loading } = useAuth()
  return loading
}