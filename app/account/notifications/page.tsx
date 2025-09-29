"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CustomerAuthGuard } from "@/components/customer/customer-auth-guard"
import { 
  Bell, 
  Package, 
  Truck, 
  Mail, 
  MessageSquare, 
  CheckCircle,
  Clock,
  Star,
  Gift,
  AlertTriangle,
  Trash2,
  MarkAsRead,
  Settings,
  Filter
} from "lucide-react"

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "order",
    title: "Order Shipped",
    message: "Your order #ORD-2024-001 has been shipped and is on its way!",
    timestamp: "2024-01-15T14:30:00Z",
    read: false,
    priority: "normal",
    orderNumber: "ORD-2024-001",
    trackingNumber: "LR123456789"
  },
  {
    id: 2,
    type: "promotion",
    title: "Flash Sale: 25% Off Brake Pads",
    message: "Limited time offer on premium brake pads. Sale ends in 2 hours!",
    timestamp: "2024-01-15T10:00:00Z",
    read: false,
    priority: "high",
    promotion: {
      discount: 25,
      category: "Brake Pads",
      expiresAt: "2024-01-15T12:00:00Z"
    }
  },
  {
    id: 3,
    type: "stock",
    title: "Back in Stock",
    message: "LED Headlight Bulbs from your wishlist are now available!",
    timestamp: "2024-01-14T16:45:00Z",
    read: true,
    priority: "normal",
    product: {
      name: "LED Headlight Bulbs",
      price: 79.99,
      image: "/led-headlight-bulbs.png"
    }
  },
  {
    id: 4,
    type: "order",
    title: "Order Delivered",
    message: "Your order #ORD-2024-002 has been successfully delivered.",
    timestamp: "2024-01-14T09:20:00Z",
    read: true,
    priority: "normal",
    orderNumber: "ORD-2024-002"
  },
  {
    id: 5,
    type: "account",
    title: "Welcome to LR Parts!",
    message: "Thank you for creating your account. Enjoy exclusive member benefits and faster checkout.",
    timestamp: "2024-01-10T12:00:00Z",
    read: true,
    priority: "low",
    welcome: true
  },
  {
    id: 6,
    type: "reward",
    title: "You've Earned Reward Points!",
    message: "You've earned 120 points from your recent purchase. Use them on your next order!",
    timestamp: "2024-01-10T10:30:00Z",
    read: true,
    priority: "normal",
    points: 120
  }
]

// Notification preferences
const notificationPreferences = {
  orderUpdates: true,
  promotionalEmails: true,
  stockAlerts: true,
  priceDrops: false,
  newsletter: true,
  pushNotifications: true,
  smsNotifications: false,
  emailFrequency: "immediate" // immediate, daily, weekly
}

export default function CustomerNotifications() {
  const [filter, setFilter] = useState("all")
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState(notificationPreferences)

  const filteredNotifications = notifications.filter((notification) => {
    switch (filter) {
      case "unread":
        return !notification.read
      case "orders":
        return notification.type === "order"
      case "promotions":
        return notification.type === "promotion"
      case "stock":
        return notification.type === "stock"
      case "account":
        return notification.type === "account" || notification.type === "reward"
      default:
        return true
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAsRead = (notificationId: number) => {
    // Simulate API call
    console.log("Marking notification as read:", notificationId)
  }

  const handleMarkAllAsRead = () => {
    // Simulate API call
    console.log("Marking all notifications as read")
  }

  const handleDeleteNotification = (notificationId: number) => {
    // Simulate API call
    console.log("Deleting notification:", notificationId)
  }

  const handleUpdatePreferences = () => {
    // Simulate API call
    console.log("Updating notification preferences:", preferences)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="h-5 w-5 text-blue-600" />
      case "promotion":
        return <Gift className="h-5 w-5 text-purple-600" />
      case "stock":
        return <Bell className="h-5 w-5 text-green-600" />
      case "account":
        return <CheckCircle className="h-5 w-5 text-gray-600" />
      case "reward":
        return <Star className="h-5 w-5 text-yellow-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString('en-IE', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }
  }

  return (
    <CustomerAuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">
              Stay updated with your orders and account activity
              {unreadCount > 0 && (
                <span className="ml-2">
                  <Badge variant="destructive">{unreadCount} unread</Badge>
                </span>
              )}
            </p>
          </div>
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={handleMarkAllAsRead}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Order Updates</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {notifications.filter(n => n.type === "order").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping & delivery
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promotions</CardTitle>
              <Gift className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {notifications.filter(n => n.type === "promotion").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Deals & offers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        {showSettings && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-4">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-gray-500">Get notified about order status changes</p>
                    </div>
                    <Switch
                      checked={preferences.orderUpdates}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, orderUpdates: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotional Emails</p>
                      <p className="text-sm text-gray-500">Special offers and discounts</p>
                    </div>
                    <Switch
                      checked={preferences.promotionalEmails}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, promotionalEmails: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Stock Alerts</p>
                      <p className="text-sm text-gray-500">When wishlist items are back in stock</p>
                    </div>
                    <Switch
                      checked={preferences.stockAlerts}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, stockAlerts: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Price Drop Alerts</p>
                      <p className="text-sm text-gray-500">When items go on sale</p>
                    </div>
                    <Switch
                      checked={preferences.priceDrops}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, priceDrops: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-gray-500">Monthly automotive tips and news</p>
                    </div>
                    <Switch
                      checked={preferences.newsletter}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, newsletter: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-4">Delivery Preferences</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="emailFrequency">Email Frequency</Label>
                    <Select 
                      value={preferences.emailFrequency}
                      onValueChange={(value) => 
                        setPreferences(prev => ({ ...prev, emailFrequency: value }))
                      }
                    >
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">Browser notifications for urgent updates</p>
                    </div>
                    <Switch
                      checked={preferences.pushNotifications}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Text messages for critical updates</p>
                    </div>
                    <Switch
                      checked={preferences.smsNotifications}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, smsNotifications: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleUpdatePreferences}>
                <Settings className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Filter and Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Your latest updates and alerts</CardDescription>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter notifications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="unread">Unread Only</SelectItem>
                  <SelectItem value="orders">Order Updates</SelectItem>
                  <SelectItem value="promotions">Promotions</SelectItem>
                  <SelectItem value="stock">Stock Alerts</SelectItem>
                  <SelectItem value="account">Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex items-start space-x-4 p-4 border rounded-lg ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                          )}
                          <Badge 
                            variant="outline" 
                            className={getPriorityColor(notification.priority)}
                          >
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        
                        {/* Additional content based on notification type */}
                        {notification.orderNumber && (
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Order: {notification.orderNumber}</span>
                            {notification.trackingNumber && (
                              <span>Tracking: {notification.trackingNumber}</span>
                            )}
                          </div>
                        )}

                        {notification.product && (
                          <div className="flex items-center space-x-2 mt-2">
                            <img 
                              src={notification.product.image} 
                              alt={notification.product.name}
                              className="h-8 w-8 rounded object-cover"
                            />
                            <span className="text-sm font-medium">€{notification.product.price}</span>
                          </div>
                        )}

                        {notification.points && (
                          <div className="flex items-center space-x-1 mt-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-yellow-700">
                              +{notification.points} points
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <div className="flex space-x-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteNotification(notification.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-500">
                  {filter === "unread" 
                    ? "You're all caught up! No unread notifications." 
                    : "No notifications match your current filter."
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CustomerAuthGuard>
  )
}
