"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "manager"
  avatar?: string
}

interface AdminAuthState {
  user: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AdminAuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: AdminUser }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }

const AdminAuthContext = createContext<{
  state: AdminAuthState
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
} | null>(null)

function adminAuthReducer(state: AdminAuthState, action: AdminAuthAction): AdminAuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true }
    case "LOGIN_SUCCESS":
      return { 
        user: action.payload, 
        isAuthenticated: true, 
        isLoading: false 
      }
    case "LOGIN_FAILURE":
      return { 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      }
    case "LOGOUT":
      return { 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminAuthReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  const router = useRouter()

  // Mock login function - replace with real API call
  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock credentials for demo
      if (email === "admin@lrparts.ie" && password === "admin123") {
        const user: AdminUser = {
          id: "1",
          email: email,
          name: "Admin User",
          role: "admin",
          avatar: "/placeholder-user.jpg"
        }
        
        localStorage.setItem("admin_token", "mock-jwt-token")
        localStorage.setItem("admin_user", JSON.stringify(user))
        
        dispatch({ type: "LOGIN_SUCCESS", payload: user })
        return true
      } else {
        dispatch({ type: "LOGIN_FAILURE" })
        return false
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    dispatch({ type: "LOGOUT" })
    router.push("/admin/login")
  }

  const checkAuth = () => {
    const token = localStorage.getItem("admin_token")
    const userStr = localStorage.getItem("admin_user")
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        dispatch({ type: "LOGIN_SUCCESS", payload: user })
      } catch {
        logout()
      }
    } else {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AdminAuthContext.Provider value={{ state, login, logout, checkAuth }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}

