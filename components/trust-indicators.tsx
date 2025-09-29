import { Shield, Truck, Headphones, Award } from "lucide-react"

const indicators = [
  {
    icon: Shield,
    title: "40 Years Experience",
    description: "Family-run business with over 4 decades of automotive expertise",
  },
  {
    icon: Award,
    title: "Extensive Product Catalogue",
    description: "Over 200,000 parts in our comprehensive inventory",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Reliable and cost-effective worldwide shipping",
  },
  {
    icon: Headphones,
    title: "Top Rated Reviews",
    description: "We have over 33,000 reviews rated Excellent on Trustpilot",
  },
]

export function TrustIndicators() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose LR PARTS?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of customers worldwide for quality, reliability, and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => {
            const IconComponent = indicator.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{indicator.title}</h3>
                <p className="text-muted-foreground">{indicator.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
