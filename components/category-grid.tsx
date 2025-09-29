import { Card, CardContent } from "@/components/ui/card"
import { FuelIcon as Engine, Disc, Zap, Wrench, Car, Cog } from "lucide-react"

const categories = [
  {
    name: "Engine Parts",
    icon: Engine,
    color: "bg-primary",
    count: "2,500+ items",
  },
  {
    name: "Brakes & Suspension",
    icon: Disc,
    color: "bg-accent",
    count: "1,800+ items",
  },
  {
    name: "Electrical",
    icon: Zap,
    color: "bg-chart-2",
    count: "1,200+ items",
  },
  {
    name: "Tools",
    icon: Wrench,
    color: "bg-chart-4",
    count: "900+ items",
  },
  {
    name: "Body & Exterior",
    icon: Car,
    color: "bg-chart-5",
    count: "1,500+ items",
  },
  {
    name: "Performance",
    icon: Cog,
    color: "bg-primary",
    count: "800+ items",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need with our comprehensive selection of automotive parts and accessories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.name}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
