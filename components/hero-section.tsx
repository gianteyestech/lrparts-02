import { Button } from "@/components/ui/button"
import { ArrowRight, Wrench, Shield, Truck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Premium Auto Parts for Every <span className="text-primary">Vehicle</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Discover high-quality automotive parts, tools, and accessories from trusted brands. Fast shipping, expert
              support, and competitive prices guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Browse Categories
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wrench className="h-4 w-4 text-primary" />
                <span>Expert Support</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/placeholder-llq8m.png"
              alt="Automotive parts and tools"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
