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
import { useCart } from "@/hooks/use-cart"
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  Star, 
  Trash2,
  ArrowRight,
  Plus,
  Filter
} from "lucide-react"

// Mock wishlist data
const wishlistItems = [
  {
    id: 1,
    name: "Premium Brake Pads Set",
    price: 89.99,
    originalPrice: 109.99,
    image: "/automotive-brake-pads.png",
    partNumber: "BP-2024-001",
    brand: "Brembo",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    discount: 18,
    dateAdded: "2024-01-15"
  },
  {
    id: 2,
    name: "LED Headlight Bulbs",
    price: 79.99,
    originalPrice: 79.99,
    image: "/led-headlight-bulbs.png",
    partNumber: "LED-H7-2024",
    brand: "Philips",
    inStock: true,
    rating: 4.6,
    reviews: 89,
    discount: 0,
    dateAdded: "2024-01-10"
  },
  {
    id: 3,
    name: "High-Performance Air Filter",
    price: 34.99,
    originalPrice: 39.99,
    image: "/car-air-filter.png",
    partNumber: "AF-HP-2024",
    brand: "K&N",
    inStock: false,
    rating: 4.7,
    reviews: 156,
    discount: 13,
    dateAdded: "2024-01-05"
  },
  {
    id: 4,
    name: "Carbon Fiber Door Handle",
    price: 145.00,
    originalPrice: 145.00,
    image: "/door-handle.jpg",
    partNumber: "DH-CF-2024",
    brand: "OEM+",
    inStock: true,
    rating: 4.9,
    reviews: 67,
    discount: 0,
    dateAdded: "2023-12-28"
  },
  {
    id: 5,
    name: "Winch Bumper",
    price: 199.99,
    originalPrice: 249.99,
    image: "/winch-bumper.jpg",
    partNumber: "WB-DEF-2024",
    brand: "ARB",
    inStock: true,
    rating: 4.5,
    reviews: 43,
    discount: 20,
    dateAdded: "2023-12-20"
  }
]

export default function CustomerWishlist() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("dateAdded")
  const [filterBy, setFilterBy] = useState("all")
  const { addToCart } = useCart()

  const filteredItems = wishlistItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = 
      filterBy === "all" ||
      (filterBy === "inStock" && item.inStock) ||
      (filterBy === "outOfStock" && !item.inStock) ||
      (filterBy === "onSale" && item.discount > 0)

    return matchesSearch && matchesFilter
  }).sort((a, b) => {
    switch (sortBy) {
      case "priceAsc":
        return a.price - b.price
      case "priceDesc":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      case "dateAdded":
      default:
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    }
  })

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      partNumber: item.partNumber,
      brand: item.brand
    })
  }

  const handleRemoveFromWishlist = (itemId: number) => {
    // Simulate API call
    console.log("Removing item from wishlist:", itemId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <CustomerAuthGuard>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">Items you've saved for later</p>
        </div>

        {/* Wishlist Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wishlistItems.length}</div>
              <p className="text-xs text-muted-foreground">
                Saved products
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Wishlist value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {wishlistItems.filter(item => item.inStock).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Available to buy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Sale</CardTitle>
              <Badge className="h-4 w-4 bg-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {wishlistItems.filter(item => item.discount > 0).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Items with discounts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Wishlist Items</CardTitle>
            <CardDescription>Search and filter your saved items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, part number, or brand..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="inStock">In Stock</SelectItem>
                  <SelectItem value="outOfStock">Out of Stock</SelectItem>
                  <SelectItem value="onSale">On Sale</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dateAdded">Date Added</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="relative overflow-hidden">
              {item.discount > 0 && (
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-red-500 text-white">
                    -{item.discount}%
                  </Badge>
                </div>
              )}
              
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-700 bg-white/80 hover:bg-white"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="aspect-square bg-gray-100 p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium line-clamp-2 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">Part #: {item.partNumber}</p>
                    <p className="text-xs text-gray-500">Brand: {item.brand}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs ml-1">{item.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({item.reviews})</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-primary">€{item.price.toFixed(2)}</span>
                    {item.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        €{item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={item.inStock ? "outline" : "secondary"}
                      className={item.inStock ? "text-green-700 border-green-200 bg-green-50" : "text-red-700 bg-red-50"}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Added {formatDate(item.dateAdded)}
                    </span>
                  </div>

                  <Button 
                    className="w-full" 
                    disabled={!item.inStock}
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Notify When Available"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterBy !== "all" 
                  ? "No items match your search criteria." 
                  : "Your wishlist is empty. Start adding items you love!"
                }
              </p>
              <Link href="/">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {filteredItems.length > 0 && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                filteredItems.forEach(item => {
                  if (item.inStock) {
                    handleAddToCart(item)
                  }
                })
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add All Available to Cart
            </Button>
          </div>
        )}
      </div>
    </CustomerAuthGuard>
  )
}
