"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuthGuard } from "@/components/admin/auth-guard"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProductFormData {
  name: string
  description: string
  shortDescription: string
  sku: string
  category: string
  brand: string
  price: number
  comparePrice: number
  cost: number
  stock: number
  lowStockThreshold: number
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  tags: string[]
  images: string[]
  seoTitle: string
  seoDescription: string
  isActive: boolean
  isFeatured: boolean
  trackQuantity: boolean
}

export default function CreateProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentTag, setCurrentTag] = useState("")
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    shortDescription: "",
    sku: "",
    category: "",
    brand: "",
    price: 0,
    comparePrice: 0,
    cost: 0,
    stock: 0,
    lowStockThreshold: 5,
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    tags: [],
    images: [],
    seoTitle: "",
    seoDescription: "",
    isActive: true,
    isFeatured: false,
    trackQuantity: true,
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Product data:", formData)
      router.push("/admin/products")
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSKU = () => {
    const prefix = formData.category.substring(0, 2).toUpperCase()
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    handleInputChange('sku', `${prefix}-${random}`)
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600 mt-2">Create a new product for your store</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the main product details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Textarea
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                      placeholder="Brief product description (1-2 lines)"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Full Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Detailed product description"
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        placeholder="Product brand"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engine Parts">Engine Parts</SelectItem>
                          <SelectItem value="Brakes & Suspension">Brakes & Suspension</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                          <SelectItem value="Body & Exterior">Body & Exterior</SelectItem>
                          <SelectItem value="Tools">Tools</SelectItem>
                          <SelectItem value="Performance">Performance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>Set product pricing and cost information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price (€) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="comparePrice">Compare Price (€)</Label>
                      <Input
                        id="comparePrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.comparePrice}
                        onChange={(e) => handleInputChange('comparePrice', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cost">Cost (€)</Label>
                      <Input
                        id="cost"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.cost}
                        onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {formData.comparePrice > formData.price && formData.price > 0 && (
                    <div className="text-sm text-green-600">
                      {Math.round(((formData.comparePrice - formData.price) / formData.comparePrice) * 100)}% discount
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Inventory */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory</CardTitle>
                  <CardDescription>Manage stock and inventory settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="trackQuantity"
                      checked={formData.trackQuantity}
                      onCheckedChange={(checked) => handleInputChange('trackQuantity', checked)}
                    />
                    <Label htmlFor="trackQuantity">Track quantity</Label>
                  </div>

                  {formData.trackQuantity && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="stock">Stock Quantity *</Label>
                        <Input
                          id="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                          placeholder="0"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                        <Input
                          id="lowStockThreshold"
                          type="number"
                          min="0"
                          value={formData.lowStockThreshold}
                          onChange={(e) => handleInputChange('lowStockThreshold', parseInt(e.target.value) || 5)}
                          placeholder="5"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="sku"
                          value={formData.sku}
                          onChange={(e) => handleInputChange('sku', e.target.value)}
                          placeholder="Enter SKU"
                        />
                        <Button type="button" variant="outline" onClick={generateSKU}>
                          Generate
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Dimensions (cm)</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.dimensions.length}
                        onChange={(e) => handleInputChange('dimensions.length', parseFloat(e.target.value) || 0)}
                        placeholder="Length"
                      />
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.dimensions.width}
                        onChange={(e) => handleInputChange('dimensions.width', parseFloat(e.target.value) || 0)}
                        placeholder="Width"
                      />
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.dimensions.height}
                        onChange={(e) => handleInputChange('dimensions.height', parseFloat(e.target.value) || 0)}
                        placeholder="Height"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SEO */}
              <Card>
                <CardHeader>
                  <CardTitle>Search Engine Optimization</CardTitle>
                  <CardDescription>Improve product visibility in search results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input
                      id="seoTitle"
                      value={formData.seoTitle}
                      onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                      placeholder="SEO optimized title"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.seoTitle.length}/60 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="seoDescription">SEO Description</Label>
                    <Textarea
                      id="seoDescription"
                      value={formData.seoDescription}
                      onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                      placeholder="SEO meta description"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.seoDescription.length}/160 characters
                    </p>
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" variant="outline" onClick={addTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Product Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                    />
                    <Label htmlFor="isFeatured">Featured Product</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Product Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Upload product photos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop images here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports JPG, PNG, WebP up to 10MB each
                    </p>
                    <Button type="button" variant="outline" className="mt-4">
                      Choose Images
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Product..." : "Create Product"}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AuthGuard>
  )
}

