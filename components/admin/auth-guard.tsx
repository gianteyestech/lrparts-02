"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { state } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      router.push("/admin/login")
    }
  }, [state.isLoading, state.isAuthenticated, router])

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!state.isAuthenticated) {
    return null // Will redirect to login
  }

  return <>{children}</>
}

