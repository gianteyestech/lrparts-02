import type React from "react"
import { CustomerAuthProvider } from "@/hooks/use-customer-auth"
import { CartProvider } from "@/hooks/use-cart"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"
import { CustomerHeader } from "@/components/customer/customer-header"

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CustomerAuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <CustomerHeader />
          <CustomerSidebar />
          <div className="lg:pl-64 pt-16">
            <main className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </CartProvider>
    </CustomerAuthProvider>
  )
}
