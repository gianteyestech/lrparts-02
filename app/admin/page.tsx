"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AuthGuard } from "@/components/admin/auth-guard"
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  Eye
} from "lucide-react"

const stats = [
  {
    name: "Total Revenue",
    value: "€45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    name: "Orders",
    value: "2,350",
    change: "+180.1%",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    value: "1,234",
    change: "+19%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    name: "Products",
    value: "3,456",
    change: "+4.75%",
    changeType: "positive" as const,
    icon: Package,
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    email: "john@example.com",
    total: "€234.00",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Sarah Connor",
    email: "sarah@example.com",
    total: "€167.50",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    total: "€89.99",
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    customer: "Emma Wilson",
    email: "emma@example.com",
    total: "€456.78",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "ORD-005",
    customer: "David Brown",
    email: "david@example.com",
    total: "€123.45",
    status: "completed",
    date: "2024-01-13",
  },
]

const topProducts = [
  {
    id: 1,
    name: "Premium Brake Pads Set",
    sales: 45,
    revenue: "€4,050.00",
    image: "/automotive-brake-pads.png",
  },
  {
    id: 2,
    name: "LED Headlight Bulbs",
    sales: 38,
    revenue: "€3,040.00",
    image: "/led-headlight-bulbs.png",
  },
  {
    id: 3,
    name: "High-Performance Air Filter",
    sales: 32,
    revenue: "€1,120.00",
    image: "/car-air-filter.png",
  },
  {
    id: 4,
    name: "Engine Oil Filter",
    sales: 28,
    revenue: "€364.00",
    image: "/placeholder-jhch7.png",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "processing":
      return "bg-blue-100 text-blue-800"
    case "shipped":
      return "bg-purple-100 text-purple-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.name}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs">
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest orders from your customers</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{order.total}</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Best performing products this month</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.sales} sales
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {product.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}

