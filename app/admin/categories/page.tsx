"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AuthGuard } from "@/components/admin/auth-guard"
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  FolderOpen,
  Tag,
  Package
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

// Mock category data
const categories = [
  {
    id: 1,
    name: "Engine Parts",
    slug: "engine-parts",
    description: "Essential engine components including filters, belts, gaskets, and performance parts",
    productCount: 2500,
    isActive: true,
    sortOrder: 1,
    parentId: null,
    createdAt: "2023-01-15",
    updatedAt: "2024-01-10"
  },
  {
    id: 2,
    name: "Brakes & Suspension",
    slug: "brakes-suspension",
    description: "Brake pads, rotors, suspension components, and safety systems",
    productCount: 1800,
    isActive: true,
    sortOrder: 2,
    parentId: null,
    createdAt: "2023-01-15",
    updatedAt: "2024-01-08"
  },
  {
    id: 3,
    name: "Electrical",
    slug: "electrical",
    description: "Lighting, wiring, batteries, and electrical components",
    productCount: 1200,
    isActive: true,
    sortOrder: 3,
    parentId: null,
    createdAt: "2023-01-15",
    updatedAt: "2024-01-05"
  },
  {
    id: 4,
    name: "Body & Exterior",
    slug: "body-exterior",
    description: "Body panels, trim, mirrors, and exterior accessories",
    productCount: 1500,
    isActive: true,
    sortOrder: 4,
    parentId: null,
    createdAt: "2023-01-15",
    updatedAt: "2024-01-03"
  },
  {
    id: 5,
    name: "Tools",
    slug: "tools",
    description: "Diagnostic tools, hand tools, and workshop equipment",
    productCount: 900,
    isActive: true,
    sortOrder: 5,
    parentId: null,
    createdAt: "2023-01-15",
    updatedAt: "2023-12-20"
  },
  {
    id: 6,
    name: "Performance",
    slug: "performance",
    description: "Performance upgrades, tuning parts, and racing accessories",
    productCount: 800,
    isActive: true,
    sortOrder: 6,
    parentId: null,
    createdAt: "2023-01-15",
    updatedAt: "2023-12-15"
  },
  {
    id: 7,
    name: "Air Filters",
    slug: "air-filters",
    description: "High-performance air filters for improved engine efficiency",
    productCount: 120,
    isActive: true,
    sortOrder: 1,
    parentId: 1, // Child of Engine Parts
    createdAt: "2023-02-01",
    updatedAt: "2024-01-02"
  },
  {
    id: 8,
    name: "Oil Filters",
    slug: "oil-filters",
    description: "Premium oil filters for engine protection",
    productCount: 85,
    isActive: true,
    sortOrder: 2,
    parentId: 1, // Child of Engine Parts
    createdAt: "2023-02-01",
    updatedAt: "2023-12-28"
  }
]

interface CategoryFormData {
  name: string
  slug: string
  description: string
  parentId: number | null
  isActive: boolean
  sortOrder: number
}

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    slug: "",
    description: "",
    parentId: null,
    isActive: true,
    sortOrder: 1
  })

  const filteredCategories = categories.filter((category) => {
    return category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           category.description.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const mainCategories = filteredCategories.filter(c => c.parentId === null)
  const getSubcategories = (parentId: number) => 
    filteredCategories.filter(c => c.parentId === parentId)

  const handleInputChange = (field: keyof CategoryFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-generate slug from name
    if (field === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim()
      setFormData(prev => ({
        ...prev,
        slug: slug
      }))
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      parentId: null,
      isActive: true,
      sortOrder: 1
    })
    setEditingCategory(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Category data:", formData)
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (category: any) => {
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      parentId: category.parentId,
      isActive: category.isActive,
      sortOrder: category.sortOrder
    })
    setEditingCategory(category.id)
    setIsDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-2">Organize your products into categories</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCategory 
                      ? "Update the category information below."
                      : "Create a new category to organize your products."
                    }
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="name">Category Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter category name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="url-friendly-name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Category description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="parentId">Parent Category</Label>
                    <select
                      id="parentId"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.parentId || ""}
                      onChange={(e) => handleInputChange('parentId', e.target.value ? parseInt(e.target.value) : null)}
                    >
                      <option value="">No parent (Main category)</option>
                      {mainCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sortOrder">Sort Order</Label>
                      <Input
                        id="sortOrder"
                        type="number"
                        min="1"
                        value={formData.sortOrder}
                        onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 1)}
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-6">
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                      />
                      <Label htmlFor="isActive">Active</Label>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : editingCategory ? "Update Category" : "Create Category"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
              <FolderOpen className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">
                {mainCategories.length} main categories
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
              <Tag className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {categories.filter(c => c.isActive).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently visible
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categories.reduce((sum, c) => sum + c.productCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subcategories</CardTitle>
              <Badge className="h-4 w-4 p-0 flex items-center justify-center">
                {categories.filter(c => c.parentId !== null).length}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categories.filter(c => c.parentId !== null).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Nested categories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Category Management</CardTitle>
            <CardDescription>Search and organize your product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search categories..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mainCategories.map((category) => (
                  <>
                    {/* Main Category */}
                    <TableRow key={category.id} className="bg-gray-50/50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {category.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        /{category.slug}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {category.productCount} products
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={category.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-500">—</span>
                      </TableCell>
                      <TableCell>{category.sortOrder}</TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {formatDate(category.updatedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(category)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Category
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Products
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                    {/* Subcategories */}
                    {getSubcategories(category.id).map((subcategory) => (
                      <TableRow key={subcategory.id}>
                        <TableCell>
                          <div className="ml-6">
                            <div className="font-medium text-sm">↳ {subcategory.name}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">
                              {subcategory.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          /{subcategory.slug}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {subcategory.productCount}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={subcategory.isActive ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}
                          >
                            {subcategory.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {category.name}
                        </TableCell>
                        <TableCell>{subcategory.sortOrder}</TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(subcategory.updatedAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(subcategory)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Products
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
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredCategories.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No categories found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthGuard>
  )
}

