"use client"

import { useEffect, useRef, useState } from "react"
import type { FireData } from "@/types/data-types"
import { Loader } from "lucide-react"

interface MapViewProps {
  data: FireData[]
  year: number
}

// Declare google variable
declare global {
  interface Window {
    google?: any
    initMap?: () => void
  }
}

// Use the provided API key directly
const GOOGLE_MAPS_API_KEY = "AIzaSyAXP7VF9NyzRmoKoJrJKy4oaSLAW3KmGO0"

export default function MapView({ data, year }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<google.maps.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      // Remove any existing Google Maps scripts to avoid conflicts
      const existingScripts = document.querySelectorAll('script[src*="maps.googleapis.com"]')
      existingScripts.forEach((script) => script.remove())

      // Reset Google Maps related globals
      if (window.google && window.google.maps) {
        window.google.maps = undefined
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing&callback=initMap`
      script.async = true
      script.defer = true

      window.initMap = () => {
        setMapLoaded(true)
      }

      document.head.appendChild(script)
    }

    if (!window.google) {
      loadGoogleMapsAPI()
    } else {
      setMapLoaded(true)
    }

    return () => {
      window.initMap = undefined
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    setLoading(true)

    const mapOptions: google.maps.MapOptions = {
      center: { lat: -36.6063, lng: -72.1034 }, // Chillán, Región del Ñuble, Chile
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    }

    googleMapRef.current = new google.maps.Map(mapRef.current, mapOptions)
    setLoading(false)
  }, [mapLoaded])

  // Add polygons to map
  useEffect(() => {
    if (!googleMapRef.current || !data.length) return

    // Clear existing polygons
    googleMapRef.current.data.forEach((feature) => {
      googleMapRef.current?.data.remove(feature)
    })

    // Define colors for vegetation types
    const vegetationColors: Record<string, string> = {
      "Bosque Nativo": "#FF8C00",
      "Bosque Mixto": "#1E90FF",
      Matorral: "#32CD32",
      "Matorral Arborescente": "#DC143C",
      "Matorral-Pradera": "#9370DB",
      Praderas: "#8B4513",
    }

    // Add polygons for each data point
    data.forEach((item) => {
      // In a real application, you would use actual GeoJSON data
      // For this example, we'll create simple polygons around the center point
      const center = item.coordinates
      const polygon = createPolygonAroundPoint(center, item.area / 10000)

      const feature = new google.maps.Data.Feature({
        geometry: new google.maps.Data.Polygon([polygon]),
        properties: {
          vegetationType: item.vegetationType,
          area: item.area,
          year: item.year,
          commune: item.commune,
          impactLevel: item.impactLevel,
        },
      })

      googleMapRef.current?.data.add(feature)
    })

    // Style the polygons
    googleMapRef.current.data.setStyle((feature) => {
      const vegetationType = feature.getProperty("vegetationType")
      return {
        fillColor: vegetationColors[vegetationType] || "#CCCCCC",
        fillOpacity: 0.7,
        strokeColor: "#FFFFFF",
        strokeWeight: 1,
      }
    })

    // Add info windows
    const infoWindow = new google.maps.InfoWindow()
    googleMapRef.current.data.addListener("click", (event) => {
      const vegetationType = event.feature.getProperty("vegetationType")
      const area = event.feature.getProperty("area")
      const commune = event.feature.getProperty("commune")
      const impactLevel = event.feature.getProperty("impactLevel")
      const year = event.feature.getProperty("year")

      const content = `
        <div style="padding: 8px;">
          <h3 style="margin: 0 0 8px; font-weight: bold;">${vegetationType}</h3>
          <p style="margin: 0 0 4px;"><strong>Año:</strong> ${year}</p>
          <p style="margin: 0 0 4px;"><strong>Comuna:</strong> ${commune}</p>
          <p style="margin: 0 0 4px;"><strong>Área afectada:</strong> ${area.toFixed(2)} hectáreas</p>
          <p style="margin: 0;"><strong>Nivel de impacto:</strong> ${impactLevel}</p>
        </div>
      `

      infoWindow.setContent(content)
      infoWindow.setPosition(event.latLng)
      infoWindow.open(googleMapRef.current)
    })
  }, [data])

  // Helper function to create a polygon around a point
  const createPolygonAroundPoint = (center: { lat: number; lng: number }, radiusKm: number): google.maps.LatLng[] => {
    const points: google.maps.LatLng[] = []
    const numPoints = 6 + Math.floor(Math.random() * 6) // Random number of points between 6-12

    for (let i = 0; i < numPoints; i++) {
      // Random radius variation to make irregular polygons
      const radiusVariation = radiusKm * (0.7 + Math.random() * 0.6)
      const angle = (i / numPoints) * 2 * Math.PI

      const lat = center.lat + (radiusVariation * Math.cos(angle)) / 111.32
      const lng = center.lng + (radiusVariation * Math.sin(angle)) / (111.32 * Math.cos(center.lat * (Math.PI / 180)))

      points.push(new google.maps.LatLng(lat, lng))
    }

    return points
  }

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}

