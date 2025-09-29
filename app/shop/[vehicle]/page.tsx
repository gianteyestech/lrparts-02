"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Filter, Star, Heart } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { TopBar } from "@/components/top-bar"
import { useCart } from "@/hooks/use-cart"

const partsData = {
  "series-2-2a-3-defender": [
    {
      id: 1,
      name: "Front Brake Pads Set",
      price: 45.99,
      originalPrice: 59.99,
      image: "/brake-pads.jpg",
      category: "Brakes",
      brand: "Genuine Land Rover",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      partNumber: "SFP000280",
    },
    {
      id: 2,
      name: "Air Filter Element",
      price: 28.5,
      image: "/air-filter.jpg",
      category: "Engine",
      brand: "Aftermarket",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      partNumber: "ESR4238",
    },
    {
      id: 3,
      name: "Headlight Assembly Left",
      price: 189.99,
      originalPrice: 249.99,
      image: "/headlight.jpg",
      category: "Lighting",
      brand: "OEM Quality",
      rating: 4.9,
      reviews: 67,
      inStock: false,
      partNumber: "XBC500040",
    },
    {
      id: 4,
      name: "Door Handle Exterior",
      price: 34.99,
      image: "/door-handle.jpg",
      category: "Body",
      brand: "Genuine Land Rover",
      rating: 4.7,
      reviews: 45,
      inStock: true,
      partNumber: "MXC6729",
    },
    {
      id: 101,
      name: "Clutch Kit Complete",
      price: 299.99,
      image: "/clutch-kit.jpg",
      category: "Transmission",
      brand: "LUK",
      rating: 4.9,
      reviews: 78,
      inStock: true,
      partNumber: "STC8358",
    },
    {
      id: 102,
      name: "Radiator Assembly",
      price: 189.5,
      originalPrice: 229.99,
      image: "/radiator.jpg",
      category: "Cooling",
      brand: "Genuine Land Rover",
      rating: 4.6,
      reviews: 92,
      inStock: true,
      partNumber: "PCC500450",
    },
  ],
  "land-rover-defender": [
    {
      id: 5,
      name: "Defender Winch Bumper",
      price: 899.99,
      image: "/winch-bumper.jpg",
      category: "Exterior",
      brand: "Aftermarket",
      rating: 4.9,
      reviews: 156,
      inStock: true,
      partNumber: "DEF001",
    },
    {
      id: 6,
      name: 'LED Light Bar 40"',
      price: 299.99,
      originalPrice: 399.99,
      image: "/led-light-bar.jpg",
      category: "Lighting",
      brand: "Premium",
      rating: 4.8,
      reviews: 203,
      inStock: true,
      partNumber: "LED40001",
    },
    {
      id: 103,
      name: "Snorkel Kit",
      price: 449.99,
      image: "/snorkel-kit.jpg",
      category: "Engine",
      brand: "Safari",
      rating: 4.7,
      reviews: 134,
      inStock: true,
      partNumber: "SS175HF",
    },
    {
      id: 104,
      name: "Rock Sliders Pair",
      price: 599.99,
      image: "/rock-sliders.jpg",
      category: "Protection",
      brand: "Terrafirma",
      rating: 4.8,
      reviews: 89,
      inStock: true,
      partNumber: "TF540",
    },
  ],
  "new-defender-2020": [
    {
      id: 201,
      name: "Air Suspension Compressor",
      price: 1299.99,
      image: "/air-suspension.jpg",
      category: "Suspension",
      brand: "Genuine Land Rover",
      rating: 4.9,
      reviews: 45,
      inStock: true,
      partNumber: "LR069691",
    },
    {
      id: 202,
      name: "Infotainment Screen Protector",
      price: 29.99,
      image: "/screen-protector.jpg",
      category: "Interior",
      brand: "Premium",
      rating: 4.5,
      reviews: 167,
      inStock: true,
      partNumber: "DEF2020SP",
    },
    {
      id: 203,
      name: "Roof Rails Black",
      price: 399.99,
      originalPrice: 499.99,
      image: "/roof-rails.jpg",
      category: "Exterior",
      brand: "Genuine Land Rover",
      rating: 4.8,
      reviews: 78,
      inStock: true,
      partNumber: "VPLWR0162",
    },
  ],
  "discovery-1": [
    {
      id: 301,
      name: "V8 Engine Oil Filter",
      price: 12.99,
      image: "/oil-filter.jpg",
      category: "Engine",
      brand: "Mann Filter",
      rating: 4.7,
      reviews: 234,
      inStock: true,
      partNumber: "ERR3340",
    },
    {
      id: 302,
      name: "Front Coil Springs Pair",
      price: 89.99,
      image: "/coil-springs.jpg",
      category: "Suspension",
      brand: "Bearmach",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      partNumber: "ANR2054",
    },
  ],
  "discovery-2": [
    {
      id: 401,
      name: "ACE Pump Rebuild Kit",
      price: 199.99,
      image: "/ace-pump.jpg",
      category: "Suspension",
      brand: "Dunlop",
      rating: 4.8,
      reviews: 67,
      inStock: true,
      partNumber: "ANR6502",
    },
    {
      id: 402,
      name: "Sunroof Motor",
      price: 149.99,
      originalPrice: 199.99,
      image: "/sunroof-motor.jpg",
      category: "Interior",
      brand: "Genuine Land Rover",
      rating: 4.5,
      reviews: 43,
      inStock: false,
      partNumber: "CUR000010",
    },
  ],
  "discovery-3": [
    {
      id: 501,
      name: "Air Suspension Bag Front",
      price: 299.99,
      image: "/air-bag.jpg",
      category: "Suspension",
      brand: "Dunlop",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      partNumber: "RNB000740",
    },
    {
      id: 502,
      name: "Terrain Response Switch",
      price: 89.99,
      image: "/terrain-switch.jpg",
      category: "Electronics",
      brand: "Genuine Land Rover",
      rating: 4.6,
      reviews: 124,
      inStock: true,
      partNumber: "YUD501220",
    },
  ],
  "discovery-4": [
    {
      id: 601,
      name: "Timing Chain Kit",
      price: 449.99,
      image: "/timing-chain.jpg",
      category: "Engine",
      brand: "Genuine Land Rover",
      rating: 4.8,
      reviews: 78,
      inStock: true,
      partNumber: "LR032593",
    },
    {
      id: 602,
      name: "Parking Brake Module",
      price: 599.99,
      originalPrice: 799.99,
      image: "/parking-brake.jpg",
      category: "Brakes",
      brand: "Continental",
      rating: 4.7,
      reviews: 56,
      inStock: true,
      partNumber: "LR024292",
    },
  ],
  "discovery-5": [
    {
      id: 701,
      name: "Adaptive Headlight Unit",
      price: 899.99,
      image: "/adaptive-headlight.jpg",
      category: "Lighting",
      brand: "Genuine Land Rover",
      rating: 4.9,
      reviews: 34,
      inStock: true,
      partNumber: "LR032661",
    },
    {
      id: 702,
      name: "Tailgate Strut",
      price: 79.99,
      image: "/tailgate-strut.jpg",
      category: "Body",
      brand: "Stabilus",
      rating: 4.6,
      reviews: 145,
      inStock: true,
      partNumber: "LR072216",
    },
  ],
  "discovery-sport": [
    {
      id: 801,
      name: "Turbocharger",
      price: 1299.99,
      originalPrice: 1599.99,
      image: "/turbocharger.jpg",
      category: "Engine",
      brand: "Garrett",
      rating: 4.8,
      reviews: 67,
      inStock: true,
      partNumber: "LR037700",
    },
    {
      id: 802,
      name: "Panoramic Roof Motor",
      price: 399.99,
      image: "/panoramic-motor.jpg",
      category: "Interior",
      brand: "Genuine Land Rover",
      rating: 4.5,
      reviews: 89,
      inStock: false,
      partNumber: "LR051377",
    },
  ],
  "range-rover-sport-06-09": [
    {
      id: 901,
      name: "Supercharger Belt",
      price: 89.99,
      image: "/supercharger-belt.jpg",
      category: "Engine",
      brand: "Gates",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      partNumber: "LR009518",
    },
    {
      id: 902,
      name: "Air Suspension Height Sensor",
      price: 199.99,
      image: "/height-sensor.jpg",
      category: "Suspension",
      brand: "Genuine Land Rover",
      rating: 4.8,
      reviews: 78,
      inStock: true,
      partNumber: "LR020159",
    },
  ],
  "range-rover-sport-09-13": [
    {
      id: 1001,
      name: "Diesel Particulate Filter",
      price: 899.99,
      originalPrice: 1199.99,
      image: "/dpf-filter.jpg",
      category: "Exhaust",
      brand: "Genuine Land Rover",
      rating: 4.6,
      reviews: 45,
      inStock: true,
      partNumber: "LR011279",
    },
    {
      id: 1002,
      name: "Command Driving Position",
      price: 299.99,
      image: "/command-position.jpg",
      category: "Interior",
      brand: "Genuine Land Rover",
      rating: 4.9,
      reviews: 23,
      inStock: true,
      partNumber: "LR032542",
    },
  ],
  "range-rover-sport-l494": [
    {
      id: 1101,
      name: "Active Exhaust Valve",
      price: 599.99,
      image: "/exhaust-valve.jpg",
      category: "Exhaust",
      brand: "Genuine Land Rover",
      rating: 4.8,
      reviews: 67,
      inStock: true,
      partNumber: "LR051636",
    },
    {
      id: 1102,
      name: "Wade Sensing Module",
      price: 399.99,
      originalPrice: 499.99,
      image: "/wade-sensing.jpg",
      category: "Electronics",
      brand: "Genuine Land Rover",
      rating: 4.7,
      reviews: 34,
      inStock: true,
      partNumber: "LR072588",
    },
  ],
}

const vehicleNames = {
  "series-2-2a-3-defender": "Series 2 2A & 3 Defender",
  "land-rover-defender": "Land Rover Defender",
  "new-defender-2020": "New Defender from 2020",
  "discovery-1": "Discovery 1",
  "discovery-2": "Discovery 2",
  "discovery-3": "Discovery 3",
  "discovery-4": "Discovery 4",
  "discovery-5": "Discovery 5",
  "discovery-sport": "Discovery Sport",
  "range-rover-sport-06-09": "Range Rover Sport 06-09",
  "range-rover-sport-09-13": "Range Rover Sport 09-13",
  "range-rover-sport-l494": "Range Rover Sport L494 2013-2022",
}

export default function ShopPage() {
  const params = useParams()
  const vehicleSlug = params.vehicle as string
  const vehicleName = vehicleNames[vehicleSlug as keyof typeof vehicleNames] || "Unknown Vehicle"
  const parts = partsData[vehicleSlug as keyof typeof partsData] || []

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [filteredParts, setFilteredParts] = useState(parts)
  const { addToCart, cartItems } = useCart()

  const categories = ["all", ...Array.from(new Set(parts.map((part) => part.category)))]

  useEffect(() => {
    const filtered = parts.filter(
      (part) =>
        part.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || part.category === selectedCategory),
    )

    // Sort parts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredParts(filtered)
  }, [searchTerm, selectedCategory, sortBy, parts])

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-600 mb-6">
          <span>Home</span> / <span>Shop</span> / <span className="text-slate-900">{vehicleName}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Parts for {vehicleName}</h1>
          <p className="text-slate-600">Find genuine and aftermarket parts for your vehicle</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-slate-50 rounded-lg">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search parts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredParts.length} of {parts.length} parts
          </p>
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredParts.map((part) => (
            <Card key={part.id} className="group hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                    <Image
                      src={part.image || "/placeholder.svg?height=200&width=200"}
                      alt={part.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  {!part.inStock && (
                    <Badge variant="destructive" className="absolute top-2 left-2">
                      Out of Stock
                    </Badge>
                  )}
                  {part.originalPrice && (
                    <Badge variant="secondary" className="absolute top-2 left-2 bg-red-500 text-white">
                      Sale
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {part.category}
                  </Badge>

                  <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
                    {part.name}
                  </h3>

                  <p className="text-sm text-slate-600">Part #: {part.partNumber}</p>

                  <p className="text-sm text-slate-600">Brand: {part.brand}</p>

                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(part.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">
                      {part.rating} ({part.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900">£{part.price.toFixed(2)}</span>
                    {part.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">£{part.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <Button className="w-full" onClick={() => addToCart(part)} disabled={!part.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {part.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredParts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No parts found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
