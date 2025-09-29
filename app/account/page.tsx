"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CustomerAuthGuard } from "@/components/customer/customer-auth-guard"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { 
  Package, 
  MapPin, 
  Heart, 
  CreditCard, 
  Gift, 
  Star, 
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  ArrowRight
} from "lucide-react"

// Mock data - replace with real API calls
const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 234.50,
    items: 3,
    trackingNumber: "LR123456789"
  },
  {
    id: "ORD-2024-002", 
    date: "2024-01-10",
    status: "shipped",
    total: 89.99,
    items: 1,
    trackingNumber: "LR987654321"
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05",
    status: "processing",
    total: 456.78,
    items: 5,
    trackingNumber: null
  }
]

const quickStats = {
  totalOrders: 24,
  totalSpent: 2840.65,
  rewardPoints: 1420,
  savedItems: 8
}

const recentlyViewed = [
  {
    id: 1,
    name: "Premium Brake Pads Set",
    price: 89.99,
    image: "/automotive-brake-pads.png"
  },
  {
    id: 2,
    name: "LED Headlight Bulbs",
    price: 79.99,
    image: "/led-headlight-bulbs.png"
  },
  {
    id: 3,
    name: "High-Performance Air Filter",
    price: 34.99,
    image: "/car-air-filter.png"
  }
]

function getStatusColor(status: string) {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800"
    case "shipped":
      return "bg-blue-100 text-blue-800"
    case "processing":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4" />
    case "shipped":
      return <Truck className="h-4 w-4" />
    case "processing":
      return <Clock className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

export default function CustomerDashboard() {
  const { state } = useCustomerAuth()

  return (
    <CustomerAuthGuard>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {state.customer?.firstName}!
              </h1>
              <p className="text-primary-foreground/80 mt-2">
                Here's what's happening with your account
              </p>
            </div>
            <div className="hidden md:block">
              <Link href="/">
                <Button variant="secondary">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quickStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                Since joining
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{quickStats.totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Lifetime value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quickStats.rewardPoints}</div>
              <p className="text-xs text-muted-foreground">
                €{(quickStats.rewardPoints / 100).toFixed(2)} value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quickStats.savedItems}</div>
              <p className="text-xs text-muted-foreground">
                In wishlist
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest purchases</CardDescription>
                </div>
                <Link href="/account/orders">
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()} • {order.items} items
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{order.total.toFixed(2)}</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recently Viewed */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recently Viewed</CardTitle>
                  <CardDescription>Products you've looked at</CardDescription>
                </div>
                <Link href="/account/wishlist">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentlyViewed.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                      <p className="text-primary font-medium">€{product.price.toFixed(2)}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/account/orders">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center p-6">
                <Package className="h-8 w-8 text-primary mr-4" />
                <div>
                  <p className="font-medium">Track Orders</p>
                  <p className="text-sm text-gray-500">View order status</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/account/addresses">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center p-6">
                <MapPin className="h-8 w-8 text-primary mr-4" />
                <div>
                  <p className="font-medium">Addresses</p>
                  <p className="text-sm text-gray-500">Manage delivery addresses</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/account/payment-methods">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center p-6">
                <CreditCard className="h-8 w-8 text-primary mr-4" />
                <div>
                  <p className="font-medium">Payment Methods</p>
                  <p className="text-sm text-gray-500">Manage cards & payments</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/account/rewards">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center p-6">
                <Gift className="h-8 w-8 text-primary mr-4" />
                <div>
                  <p className="font-medium">Rewards</p>
                  <p className="text-sm text-gray-500">View points & rewards</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Your account information and verification status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span>Email Verified</span>
                </div>
                {state.customer?.isVerified ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    Pending
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Customer Status</span>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  Premium
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerAuthGuard>
  )
}
