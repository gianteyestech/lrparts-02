import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Brake Pads Set",
    brand: "AutoPro",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 124,
    image: "/automotive-brake-pads.png",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "High-Performance Air Filter",
    brand: "FilterMax",
    price: 34.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 89,
    image: "/car-air-filter.png",
    badge: "New",
  },
  {
    id: 3,
    name: "LED Headlight Bulbs (Pair)",
    brand: "BrightBeam",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviews: 203,
    image: "/led-headlight-bulbs.png",
    badge: "Sale",
  },
  {
    id: 4,
    name: "Engine Oil Filter",
    brand: "PureFlo",
    price: 12.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder-jhch7.png",
    badge: null,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground">Top-rated parts trusted by professionals and enthusiasts</p>
          </div>
          <Button variant="outline">View All Products</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.badge && (
                    <Badge
                      className={`absolute top-2 left-2 ${
                        product.badge === "Sale"
                          ? "bg-destructive"
                          : product.badge === "New"
                            ? "bg-accent"
                            : "bg-primary"
                      }`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>

                <div className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
