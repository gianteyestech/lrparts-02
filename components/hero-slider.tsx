"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Premium Engine Parts",
    subtitle: "High-performance components for your vehicle",
    description: "Discover our extensive range of engine parts from trusted manufacturers",
    image: "/car-engine-parts.png",
    cta: "Shop Engine Parts",
    bgColor: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
  {
    id: 2,
    title: "Brake & Suspension Systems",
    subtitle: "Safety and performance you can trust",
    description: "Complete brake and suspension solutions for all vehicle types",
    image: "/placeholder-6k33r.png",
    cta: "Shop Brakes",
    bgColor: "bg-gradient-to-r from-emerald-600 to-emerald-700",
  },
  {
    id: 3,
    title: "Professional Tools",
    subtitle: "Equipment for the modern mechanic",
    description: "Professional-grade tools and diagnostic equipment",
    image: "/automotive-tools.png",
    cta: "Shop Tools",
    bgColor: "bg-gradient-to-r from-orange-600 to-orange-700",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-96 overflow-hidden rounded-lg mx-4 mb-8">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`${slide.bgColor} h-full flex items-center relative overflow-hidden`}>
            <div className="container mx-auto px-8 flex items-center justify-between">
              <div className="flex-1 text-white max-w-lg">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-xl mb-3 opacity-90">{slide.subtitle}</p>
                <p className="text-base mb-6 opacity-80">{slide.description}</p>
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  {slide.cta}
                </Button>
              </div>
              <div className="flex-1 flex justify-end">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="max-w-md h-80 object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
