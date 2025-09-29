"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuthGuard } from "@/components/admin/auth-guard"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"

// Mock analytics data
const salesData = [
  { month: "Jan", revenue: 32000, orders: 156, customers: 89 },
  { month: "Feb", revenue: 38000, orders: 189, customers: 102 },
  { month: "Mar", revenue: 42000, orders: 198, customers: 118 },
  { month: "Apr", revenue: 45000, orders: 210, customers: 134 },
  { month: "May", revenue: 49000, orders: 234, customers: 145 },
  { month: "Jun", revenue: 52000, orders: 245, customers: 156 },
  { month: "Jul", revenue: 55000, orders: 267, customers: 167 },
  { month: "Aug", revenue: 58000, orders: 289, customers: 178 },
  { month: "Sep", revenue: 61000, orders: 301, customers: 189 },
  { month: "Oct", revenue: 64000, orders: 324, customers: 201 },
  { month: "Nov", revenue: 67000, orders: 342, customers: 215 },
  { month: "Dec", revenue: 71000, orders: 365, customers: 234 }
]

const categoryData = [
  { name: "Engine Parts", value: 35, color: "#0088FE" },
  { name: "Brakes & Suspension", value: 25, color: "#00C49F" },
  { name: "Electrical", value: 20, color: "#FFBB28" },
  { name: "Body & Exterior", value: 12, color: "#FF8042" },
  { name: "Tools", value: 8, color: "#8884D8" }
]

const topProducts = [
  { name: "Premium Brake Pads Set", sales: 234, revenue: 20906 },
  { name: "LED Headlight Bulbs", sales: 189, revenue: 15111 },
  { name: "High-Performance Air Filter", sales: 156, revenue: 5456 },
  { name: "Engine Oil Filter", sales: 145, revenue: 1881 },
  { name: "Carbon Fiber Door Handle", sales: 98, revenue: 14210 }
]

const trafficSources = [
  { source: "Google Search", visitors: 12500, percentage: 45 },
  { source: "Direct", visitors: 6900, percentage: 25 },
  { source: "Social Media", visitors: 4200, percentage: 15 },
  { source: "Email", visitors: 2800, percentage: 10 },
  { source: "Referrals", visitors: 1400, percentage: 5 }
]

const kpis = [
  {
    title: "Total Revenue",
    value: "€678,429",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "vs last year"
  },
  {
    title: "Total Orders",
    value: "3,205",
    change: "+18.2%",
    changeType: "positive" as const,
    icon: ShoppingCart,
    description: "vs last year"
  },
  {
    title: "New Customers",
    value: "1,847",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: Users,
    description: "vs last year"
  },
  {
    title: "Page Views",
    value: "284,391",
    change: "-2.3%",
    changeType: "negative" as const,
    icon: Eye,
    description: "vs last month"
  }
]

export default function AnalyticsPage() {
  const formatCurrency = (value: number) => `€${value.toLocaleString()}`
  
  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">Track your store performance and insights</p>
          </div>
          <Select defaultValue="12months">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs">
                  {kpi.changeType === "positive" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={kpi.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                    {kpi.change}
                  </span>
                  <span className="text-gray-500 ml-1">{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue, orders, and customer growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(value as number) : value,
                      name === 'revenue' ? 'Revenue' : name === 'orders' ? 'Orders' : 'Customers'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0088FE" 
                    fill="#0088FE" 
                    fillOpacity={0.1}
                  />
                  <Line type="monotone" dataKey="orders" stroke="#00C49F" />
                  <Line type="monotone" dataKey="customers" stroke="#FFBB28" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Revenue distribution across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </div>
                    <span className="font-medium">{category.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-sm font-medium">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(product.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Orders</CardTitle>
              <CardDescription>Order volume trends throughout the year</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#0088FE" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{source.source}</span>
                      <span className="text-gray-500">
                        {source.visitors.toLocaleString()} ({source.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">€15,234</p>
                <p className="text-sm text-gray-500">Revenue Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">89</p>
                <p className="text-sm text-gray-500">Orders Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">23</p>
                <p className="text-sm text-gray-500">New Customers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">4.8</p>
                <p className="text-sm text-gray-500">Avg. Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}

