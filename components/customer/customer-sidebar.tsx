"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Settings, 
  CreditCard, 
  Menu, 
  X,
  LogOut,
  ShoppingBag,
  Bell,
  Gift
} from "lucide-react"
import { useCustomerAuth } from "@/hooks/use-customer-auth"

const navigation = [
  {
    name: "Dashboard",
    href: "/account",
    icon: User,
  },
  {
    name: "Orders",
    href: "/account/orders",
    icon: Package,
  },
  {
    name: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    name: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
  },
  {
    name: "Payment Methods",
    href: "/account/payment-methods",
    icon: CreditCard,
  },
  {
    name: "Notifications",
    href: "/account/notifications",
    icon: Bell,
  },
  {
    name: "Rewards",
    href: "/account/rewards",
    icon: Gift,
  },
  {
    name: "Settings",
    href: "/account/settings",
    icon: Settings,
  },
]

export function CustomerSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { state, logout } = useCustomerAuth()

  if (!state.isAuthenticated) {
    return null
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col bg-white border-r border-gray-200 pt-16">
          {/* Customer Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <span className="text-sm font-medium">
                  {state.customer?.firstName?.charAt(0) || ""}
                  {state.customer?.lastName?.charAt(0) || ""}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {state.customer?.firstName} {state.customer?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {state.customer?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
