"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { Loader2 } from "lucide-react"

interface CustomerAuthGuardProps {
  children: React.ReactNode
}

export function CustomerAuthGuard({ children }: CustomerAuthGuardProps) {
  const { state } = useCustomerAuth()
  const router = useRouter()

  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      router.push("/account/login")
    }
  }, [state.isLoading, state.isAuthenticated, router])

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    )
  }

  if (!state.isAuthenticated) {
    return null // Will redirect to login
  }

  return <>{children}</>
}
