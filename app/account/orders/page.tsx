"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CustomerAuthGuard } from "@/components/customer/customer-auth-guard"
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  Eye,
  Download,
  RefreshCw,
  ArrowRight
} from "lucide-react"

// Mock orders data
const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15T10:30:00Z",
    status: "delivered",
    paymentStatus: "paid",
    total: 234.50,
    shippingCost: 8.95,
    items: [
      { name: "Premium Brake Pads Set", quantity: 1, price: 89.99, image: "/automotive-brake-pads.png" },
      { name: "LED Headlight Bulbs", quantity: 2, price: 79.99, image: "/led-headlight-bulbs.png" }
    ],
    trackingNumber: "LR123456789",
    estimatedDelivery: "2024-01-18",
    shippingAddress: {
      name: "John Smith",
      street: "123 Main Street",
      city: "Dublin",
      zip: "D01 Y123",
      country: "Ireland"
    }
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10T14:20:00Z",
    status: "shipped",
    paymentStatus: "paid",
    total: 89.99,
    shippingCost: 8.95,
    items: [
      { name: "High-Performance Air Filter", quantity: 1, price: 34.99, image: "/car-air-filter.png" }
    ],
    trackingNumber: "LR987654321",
    estimatedDelivery: "2024-01-17",
    shippingAddress: {
      name: "John Smith",
      street: "123 Main Street",
      city: "Dublin",
      zip: "D01 Y123",
      country: "Ireland"
    }
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05T09:15:00Z",
    status: "processing",
    paymentStatus: "paid",
    total: 456.78,
    shippingCost: 0, // Free shipping
    items: [
      { name: "Carbon Fiber Door Handle", quantity: 2, price: 145.00, image: "/door-handle.jpg" },
      { name: "Engine Oil Filter", quantity: 5, price: 12.99, image: "/placeholder-jhch7.png" }
    ],
    trackingNumber: null,
    estimatedDelivery: "2024-01-20",
    shippingAddress: {
      name: "John Smith",
      street: "123 Main Street",
      city: "Dublin",
      zip: "D01 Y123",
      country: "Ireland"
    }
  },
  {
    id: "ORD-2023-124",
    date: "2023-12-28T16:45:00Z",
    status: "cancelled",
    paymentStatus: "refunded",
    total: 199.99,
    shippingCost: 8.95,
    items: [
      { name: "Winch Bumper", quantity: 1, price: 199.99, image: "/winch-bumper.jpg" }
    ],
    trackingNumber: null,
    estimatedDelivery: null,
    shippingAddress: {
      name: "John Smith",
      street: "123 Main Street",
      city: "Dublin",
      zip: "D01 Y123",
      country: "Ireland"
    }
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
    case "cancelled":
      return <XCircle className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

function getPaymentStatusColor(status: string) {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "refunded":
      return "bg-gray-100 text-gray-800"
    case "failed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function CustomerOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IE', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <CustomerAuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === "shipped").length}
              </div>
              <p className="text-xs text-muted-foreground">
                On the way
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === "delivered").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully received
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                On all orders
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>Search and filter your order history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search orders by ID, tracking number, or product name..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-gray-500">
                        Placed {formatDate(order.date)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">€{order.total.toFixed(2)}</p>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <Badge variant="outline" className={getPaymentStatusColor(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} × €{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          €{(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-4 border-t gap-4">
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                    {order.trackingNumber && (
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-1" />
                        Tracking: {order.trackingNumber}
                      </div>
                    )}
                    {order.estimatedDelivery && order.status !== "delivered" && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Expected: {formatShortDate(order.estimatedDelivery)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Buy Again
                      </Button>
                    )}
                    
                    {order.trackingNumber && order.status !== "delivered" && (
                      <Button variant="outline" size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Package
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "No orders match your search criteria." 
                  : "You haven't placed any orders yet."
                }
              </p>
              <Link href="/">
                <Button>
                  Start Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </CustomerAuthGuard>
  )
}
