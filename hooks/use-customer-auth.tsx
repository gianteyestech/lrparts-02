"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface Customer {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  avatar?: string
  isVerified: boolean
  createdAt: string
}

interface CustomerAuthState {
  customer: Customer | null
  isAuthenticated: boolean
  isLoading: boolean
}

type CustomerAuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: Customer }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "UPDATE_PROFILE"; payload: Partial<Customer> }

const CustomerAuthContext = createContext<{
  state: CustomerAuthState
  login: (email: string, password: string) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<Customer>) => Promise<boolean>
  checkAuth: () => void
} | null>(null)

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
}

function customerAuthReducer(state: CustomerAuthState, action: CustomerAuthAction): CustomerAuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true }
    case "LOGIN_SUCCESS":
      return { 
        customer: action.payload, 
        isAuthenticated: true, 
        isLoading: false 
      }
    case "LOGIN_FAILURE":
      return { 
        customer: null, 
        isAuthenticated: false, 
        isLoading: false 
      }
    case "LOGOUT":
      return { 
        customer: null, 
        isAuthenticated: false, 
        isLoading: false 
      }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "UPDATE_PROFILE":
      return {
        ...state,
        customer: state.customer ? { ...state.customer, ...action.payload } : null
      }
    default:
      return state
  }
}

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(customerAuthReducer, {
    customer: null,
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
      if (email === "customer@example.com" && password === "password123") {
        const customer: Customer = {
          id: "1",
          email: email,
          firstName: "John",
          lastName: "Smith",
          phone: "+353 1 234 5678",
          isVerified: true,
          createdAt: "2023-06-15T10:00:00Z"
        }
        
        localStorage.setItem("customer_token", "mock-customer-jwt-token")
        localStorage.setItem("customer_user", JSON.stringify(customer))
        
        dispatch({ type: "LOGIN_SUCCESS", payload: customer })
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

  // Mock register function - replace with real API call
  const register = async (data: RegisterData): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const customer: Customer = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        isVerified: false,
        createdAt: new Date().toISOString()
      }
      
      localStorage.setItem("customer_token", "mock-customer-jwt-token")
      localStorage.setItem("customer_user", JSON.stringify(customer))
      
      dispatch({ type: "LOGIN_SUCCESS", payload: customer })
      return true
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }
  }

  const updateProfile = async (data: Partial<Customer>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedCustomer = { ...state.customer, ...data } as Customer
      localStorage.setItem("customer_user", JSON.stringify(updatedCustomer))
      
      dispatch({ type: "UPDATE_PROFILE", payload: data })
      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("customer_token")
    localStorage.removeItem("customer_user")
    dispatch({ type: "LOGOUT" })
    router.push("/account/login")
  }

  const checkAuth = () => {
    const token = localStorage.getItem("customer_token")
    const customerStr = localStorage.getItem("customer_user")
    
    if (token && customerStr) {
      try {
        const customer = JSON.parse(customerStr)
        dispatch({ type: "LOGIN_SUCCESS", payload: customer })
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
    <CustomerAuthContext.Provider value={{ state, login, register, logout, updateProfile, checkAuth }}>
      {children}
    </CustomerAuthContext.Provider>
  )
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext)
  if (!context) {
    throw new Error("useCustomerAuth must be used within a CustomerAuthProvider")
  }
  return context
}
