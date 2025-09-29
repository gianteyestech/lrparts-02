import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { HeroSlider } from "@/components/hero-slider"
import { VehicleSelector } from "@/components/vehicle-selector"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { TrustIndicators } from "@/components/trust-indicators"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <HeroSlider />
        <VehicleSelector />
        <CategoryGrid />
        <FeaturedProducts />
        <TrustIndicators />
      </main>
      <Footer />
    </div>
  )
}
