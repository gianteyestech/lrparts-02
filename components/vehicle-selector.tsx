"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"

const vehicleModels = [
  { id: 1, name: "Series 2 2A & 3 Defender", image: "/series-2-2a-3-defender.jpg" },
  { id: 2, name: "Land Rover Defender", image: "/land-rover-defender-icon.jpg" },
  { id: 3, name: "New Defender from 2020", image: "/new-defender-2020.jpg" },
  { id: 4, name: "Discovery 1", image: "/discovery-1.jpg" },
  { id: 5, name: "Discovery 2", image: "/discovery-2.jpg" },
  { id: 6, name: "Discovery 3", image: "/discovery-3.jpg" },
  { id: 7, name: "Discovery 4", image: "/discovery-4.jpg" },
  { id: 8, name: "Discovery 5", image: "/discovery-5.jpg" },
  { id: 9, name: "Discovery Sport", image: "/discovery-sport.jpg" },
  { id: 10, name: "Range Rover Sport 06-09", image: "/range-rover-sport-06-09.jpg" },
  { id: 11, name: "Range Rover Sport 09-13", image: "/range-rover-sport-09-13.jpg" },
  { id: 12, name: "Range Rover Sport L494 2013-2022", image: "/range-rover-sport-l494.jpg" },
]

export function VehicleSelector() {
  const [visibleCount, setVisibleCount] = useState(8)
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null)
  const [touchedCard, setTouchedCard] = useState<number | null>(null)
  const router = useRouter()

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, vehicleModels.length))
  }

  const handleVehicleSelect = (vehicleId: number) => {
    const vehicle = vehicleModels.find((v) => v.id === vehicleId)
    if (vehicle) {
      const slug = vehicle.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      router.push(`/shop/${slug}`)
    }
  }

  const handleTouchStart = (vehicleId: number) => {
    setTouchedCard(vehicleId)
  }

  const handleTouchEnd = () => {
    setTimeout(() => setTouchedCard(null), 150)
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Select Your Vehicle</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose your Land Rover or Range Rover model to find the exact parts you need. We stock genuine and
            aftermarket parts for all models.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {vehicleModels.slice(0, visibleCount).map((vehicle) => {
            const isActive = touchedCard === vehicle.id
            const isSelected = selectedVehicle === vehicle.id

            return (
              <Card
                key={vehicle.id}
                className={`cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-105 active:shadow-2xl relative overflow-hidden group ${
                  isSelected ? "ring-2 ring-primary shadow-lg" : ""
                } ${isActive ? "shadow-2xl scale-105" : ""}`}
                onClick={() => setSelectedVehicle(vehicle.id)}
                onTouchStart={() => handleTouchStart(vehicle.id)}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-green-600 via-white to-orange-500 transition-opacity duration-500 ease-in-out z-10 ${
                    isActive ? "opacity-20" : "opacity-0 group-hover:opacity-20"
                  }`}
                ></div>

                <div
                  className={`absolute inset-0 border-2 transition-all duration-500 ease-in-out rounded-lg ${
                    isActive ? "border-green-600" : "border-transparent group-hover:border-green-600"
                  }`}
                ></div>
                <div
                  className={`absolute inset-0 border-2 transition-all duration-700 ease-in-out rounded-lg ${
                    isActive
                      ? "animate-pulse border-orange-500 opacity-50"
                      : "border-transparent group-hover:animate-pulse group-hover:border-orange-500 opacity-0 group-hover:opacity-50"
                  }`}
                ></div>

                <CardContent className="p-4 relative z-20">
                  <div
                    className={`aspect-[3/2] relative mb-3 rounded-lg overflow-hidden bg-transparent transition-colors duration-300 ${
                      isActive ? "bg-green-50/30" : "group-hover:bg-green-50/30"
                    }`}
                  >
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      fill
                      className={`object-cover transition-transform duration-500 ease-in-out mix-blend-multiply ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                      style={{ backgroundColor: "transparent" }}
                    />
                    <div
                      className={`absolute top-2 right-2 w-6 h-4 transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <div className="w-full h-full bg-gradient-to-r from-green-600 via-white to-orange-500 rounded-sm shadow-sm"></div>
                    </div>
                  </div>
                  <h3
                    className={`font-semibold text-slate-900 text-center text-sm leading-tight transition-colors duration-300 ${
                      isActive ? "text-green-700" : "group-hover:text-green-700"
                    }`}
                  >
                    {vehicle.name}
                  </h3>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {visibleCount < vehicleModels.length && (
          <div className="text-center">
            <Button
              onClick={loadMore}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
            >
              Load More Models ({vehicleModels.length - visibleCount} remaining)
            </Button>
          </div>
        )}

        {selectedVehicle && (
          <div className="mt-8 text-center">
            <Button size="lg" className="px-8 py-3" onClick={() => handleVehicleSelect(selectedVehicle)}>
              Shop Parts for {vehicleModels.find((v) => v.id === selectedVehicle)?.name}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
