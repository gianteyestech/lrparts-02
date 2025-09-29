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
import { AuthGuard } from "@/components/admin/auth-guard"
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Calendar,
  User,
  Globe
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock pages data
const pages = [
  {
    id: 1,
    title: "About Us",
    slug: "about-us",
    status: "published",
    type: "page",
    author: "Admin User",
    publishedAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
    views: 1250,
    seoTitle: "About LR Parts - Your Trusted Automotive Parts Supplier",
    seoDescription: "Learn about LR Parts, Ireland's leading supplier of premium automotive parts and accessories for Land Rover and Range Rover vehicles."
  },
  {
    id: 2,
    title: "Contact Us",
    slug: "contact-us",
    status: "published",
    type: "page",
    author: "Admin User",
    publishedAt: "2024-01-08T09:15:00Z",
    updatedAt: "2024-01-12T16:20:00Z",
    views: 890,
    seoTitle: "Contact LR Parts - Get Expert Automotive Support",
    seoDescription: "Contact LR Parts for expert advice on automotive parts. Phone, email, and address details for our Ireland locations."
  },
  {
    id: 3,
    title: "Shipping & Returns",
    slug: "shipping-returns",
    status: "published",
    type: "page",
    author: "Admin User",
    publishedAt: "2024-01-05T11:45:00Z",
    updatedAt: "2024-01-10T13:10:00Z",
    views: 2100,
    seoTitle: "Shipping & Returns Policy - LR Parts",
    seoDescription: "Learn about our shipping options, delivery times, and hassle-free returns policy for automotive parts orders."
  },
  {
    id: 4,
    title: "Privacy Policy",
    slug: "privacy-policy",
    status: "published",
    type: "legal",
    author: "Admin User",
    publishedAt: "2023-12-20T15:30:00Z",
    updatedAt: "2024-01-05T10:45:00Z",
    views: 450,
    seoTitle: "Privacy Policy - LR Parts",
    seoDescription: "Our privacy policy explains how we collect, use, and protect your personal information when using our website."
  },
  {
    id: 5,
    title: "Terms of Service",
    slug: "terms-of-service",
    status: "published",
    type: "legal",
    author: "Admin User",
    publishedAt: "2023-12-20T15:00:00Z",
    updatedAt: "2024-01-03T09:20:00Z",
    views: 320,
    seoTitle: "Terms of Service - LR Parts",
    seoDescription: "Terms and conditions for using our website and purchasing automotive parts from LR Parts."
  },
  {
    id: 6,
    title: "Installation Guides",
    slug: "installation-guides",
    status: "draft",
    type: "page",
    author: "Manager User",
    publishedAt: null,
    updatedAt: "2024-01-14T12:15:00Z",
    views: 0,
    seoTitle: "Automotive Parts Installation Guides - LR Parts",
    seoDescription: "Step-by-step installation guides for automotive parts and accessories. Professional tips and safety information."
  }
]

function getStatusColor(status: string) {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800"
    case "draft":
      return "bg-yellow-100 text-yellow-800"
    case "archived":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "page":
      return "bg-blue-100 text-blue-800"
    case "legal":
      return "bg-purple-100 text-purple-800"
    case "blog":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function PagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredPages = pages.filter((page) => {
    const matchesSearch = 
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.seoTitle.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || page.status === statusFilter
    const matchesType = typeFilter === "all" || page.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—"
    return new Date(dateString).toLocaleDateString('en-IE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
            <p className="text-gray-600 mt-2">Manage your website pages and content</p>
          </div>
          <Link href="/admin/content/pages/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Page
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pages.length}</div>
              <p className="text-xs text-muted-foreground">
                All content pages
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Globe className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {pages.filter(p => p.status === "published").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Live on website
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {pages.filter(p => p.status === "draft").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Work in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pages.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Page views
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Search and filter your website pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search pages..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="page">Page</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pages Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{page.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {page.seoDescription}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        /{page.slug}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(page.status)}>
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(page.type)}>
                        {page.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <User className="h-3 w-3 mr-1 text-gray-400" />
                        {page.author}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Eye className="h-3 w-3 mr-1 text-gray-400" />
                        {page.views.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                        {formatDate(page.updatedAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Page
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Globe className="mr-2 h-4 w-4" />
                            View Live
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredPages.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No pages found matching your criteria.</p>
              <Link href="/admin/content/pages/create">
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Page
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthGuard>
  )
}

