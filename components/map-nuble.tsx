"use client"
import type React from "react"
import { useCallback, useRef, useState, useEffect } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import type { FireData } from "@/types/data-types"
import { Loader } from "lucide-react"

// Estilo del contenedor del mapa
const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
}

// Coordenadas aproximadas del centro de la Región de Ñuble
const centerÑuble = {
  lat: -36.75,
  lng: -72.5,
}

// Límites de la Región de Ñuble (aproximados)
const nubleBounds = {
  north: -36.0, // Límite norte
  south: -37.2, // Límite sur
  east: -71.0, // Límite este
  west: -73.2, // Límite oeste
}

// API key de Google Maps
const GOOGLE_MAPS_API_KEY = "AIzaSyAXP7VF9NyzRmoKoJrJKy4oaSLAW3KmGO0"

// URL del SVG personalizado para los touchpoints
const TOUCHPOINT_SVG_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/touchpoint-TvZw64XPwiM6cmiMieuiR0vc8RWmyM.svg"

// Reemplazar la definición actual de vegetationColors con esta nueva paleta
// Colores para tipos de vegetación - Paleta derivada de #1A562A con tonos más suaves
const vegetationColors: Record<string, { color: string; symbol: string }> = {
  "Bosque Nativo": { color: "#2D7A41", symbol: "🌳" },
  "Bosque Mixto": { color: "#4D9F50", symbol: "🌿" },
  Matorral: { color: "#6ABF69", symbol: "🍃" },
  "Matorral Arborescente": { color: "#3C9141", symbol: "🌾" },
  "Matorral-Pradera": { color: "#88C07D", symbol: "🍀" },
  Praderas: { color: "#A2D9A4", symbol: "🌱" },
  "Área Afectada": { color: "#F8B947", symbol: "🔥" },
}

// Base coordinates for communes in Ñuble region
const communeCoordinates = {
  Chillán: { lat: -36.6063, lng: -72.1034 },
  "Chillán Viejo": { lat: -36.6372, lng: -72.1383 },
  Bulnes: { lat: -36.7421, lng: -72.2984 },
  Coelemu: { lat: -36.4863, lng: -72.7042 },
  Coihueco: { lat: -36.6278, lng: -71.8307 },
  "El Carmen": { lat: -36.8994, lng: -72.0311 },
  Ninhue: { lat: -36.4019, lng: -72.3981 },
  Ñiquén: { lat: -36.2917, lng: -71.9019 },
  Pemuco: { lat: -36.9767, lng: -72.1017 },
  Pinto: { lat: -36.7003, lng: -71.8931 },
  Portezuelo: { lat: -36.5294, lng: -72.4333 },
  Quillón: { lat: -36.7381, lng: -72.4692 },
  Quirihue: { lat: -36.2828, lng: -72.5414 },
  Ránquil: { lat: -36.6519, lng: -72.5539 },
  "San Carlos": { lat: -36.4244, lng: -71.9581 },
  "San Fabián": { lat: -36.5539, lng: -71.5508 },
  "San Ignacio": { lat: -36.8092, lng: -72.0317 },
  "San Nicolás": { lat: -36.4992, lng: -72.2139 },
  Treguaco: { lat: -36.4333, lng: -72.6667 },
  Yungay: { lat: -37.1211, lng: -72.0156 },
}

// GeoJSON embebido con las 21 comunas de Ñuble
const nubleComunasGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "San Nicolás",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Nativo",
        area_ha: 1492.01,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.2139, -36.4992],
            [-72.1139, -36.4992],
            [-72.1139, -36.3992],
            [-72.2139, -36.3992],
            [-72.2139, -36.4992],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Chillán",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Nativo",
        area_ha: 519.15,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.1534, -36.6063],
            [-72.0534, -36.6063],
            [-72.0534, -36.5063],
            [-72.1534, -36.5063],
            [-72.1534, -36.6063],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Chillán Viejo",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Mixto",
        area_ha: 1250.75,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.1883, -36.6372],
            [-72.0883, -36.6372],
            [-72.0883, -36.5372],
            [-72.1883, -36.5372],
            [-72.1883, -36.6372],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Pemuco",
        region: "Ñuble",
        tipo_vegetacion: "Matorral Arborescente",
        area_ha: 44.36,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.1517, -36.9767],
            [-72.0517, -36.9767],
            [-72.0517, -36.8767],
            [-72.1517, -36.8767],
            [-72.1517, -36.9767],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "El Carmen",
        region: "Ñuble",
        tipo_vegetacion: "Matorral",
        area_ha: 1250.75,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.0811, -36.8994],
            [-71.9811, -36.8994],
            [-71.9811, -36.7994],
            [-72.0811, -36.7994],
            [-72.0811, -36.8994],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Pinto",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Nativo",
        area_ha: 1911.11,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.9431, -36.7003],
            [-71.8431, -36.7003],
            [-71.8431, -36.6003],
            [-71.9431, -36.6003],
            [-71.9431, -36.7003],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "San Ignacio",
        region: "Ñuble",
        tipo_vegetacion: "Matorral-Pradera",
        area_ha: 1250.75,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.0817, -36.8092],
            [-71.9817, -36.8092],
            [-71.9817, -36.7092],
            [-72.0817, -36.7092],
            [-72.0817, -36.8092],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Quillón",
        region: "Ñuble",
        tipo_vegetacion: "Matorral",
        area_ha: 18296.28,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.5192, -36.7381],
            [-72.4192, -36.7381],
            [-72.4192, -36.6381],
            [-72.5192, -36.6381],
            [-72.5192, -36.7381],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Bulnes",
        region: "Ñuble",
        tipo_vegetacion: "Matorral-Pradera",
        area_ha: 1250.75,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.3484, -36.7421],
            [-72.2484, -36.7421],
            [-72.2484, -36.6421],
            [-72.3484, -36.6421],
            [-72.3484, -36.7421],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Yungay",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Mixto",
        area_ha: 1250.75,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.0656, -37.1211],
            [-71.9656, -37.1211],
            [-71.9656, -37.0211],
            [-72.0656, -37.0211],
            [-72.0656, -37.1211],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "San Carlos",
        region: "Ñuble",
        tipo_vegetacion: "Matorral",
        area_ha: 3544.01,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.0081, -36.4244],
            [-71.9081, -36.4244],
            [-71.9081, -36.3244],
            [-72.0081, -36.3244],
            [-72.0081, -36.4244],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "San Fabián",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Nativo",
        area_ha: 1911.11,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.6008, -36.5539],
            [-71.5008, -36.5539],
            [-71.5008, -36.4539],
            [-71.6008, -36.4539],
            [-71.6008, -36.5539],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Coihueco",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Nativo",
        area_ha: 1911.11,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.8807, -36.6278],
            [-71.7807, -36.6278],
            [-71.7807, -36.5278],
            [-71.8807, -36.5278],
            [-71.8807, -36.6278],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Ñiquén",
        region: "Ñuble",
        tipo_vegetacion: "Matorral",
        area_ha: 1250.75,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.9519, -36.2917],
            [-71.8519, -36.2917],
            [-71.8519, -36.1917],
            [-71.9519, -36.1917],
            [-71.9519, -36.2917],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Ninhue",
        region: "Ñuble",
        tipo_vegetacion: "Matorral",
        area_ha: 1250.75,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.4481, -36.4019],
            [-72.3481, -36.4019],
            [-72.3481, -36.3019],
            [-72.4481, -36.3019],
            [-72.4481, -36.4019],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Portezuelo",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Nativo",
        area_ha: 1911.11,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.4833, -36.5294],
            [-72.3833, -36.5294],
            [-72.3833, -36.4294],
            [-72.4833, -36.4294],
            [-72.4833, -36.5294],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Ránquil",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Mixto",
        area_ha: 16942.5,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.6039, -36.6519],
            [-72.5039, -36.6519],
            [-72.5039, -36.5519],
            [-72.6039, -36.5519],
            [-72.6039, -36.6519],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Cobquecura",
        region: "Ñuble",
        tipo_vegetacion: "Matorral",
        area_ha: 1250.75,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-73.05, -36.2],
            [-72.95, -36.2],
            [-72.95, -36.1],
            [-73.05, -36.1],
            [-73.05, -36.2],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Treguaco",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Mixto",
        area_ha: 1250.75,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.7167, -36.4333],
            [-72.6167, -36.4333],
            [-72.6167, -36.3333],
            [-72.7167, -36.3333],
            [-72.7167, -36.4333],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Quirihue",
        region: "Ñuble",
        tipo_vegetacion: "Matorral Arborescente",
        area_ha: 2304.03,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.5914, -36.2828],
            [-72.4914, -36.2828],
            [-72.4914, -36.1828],
            [-72.5914, -36.1828],
            [-72.5914, -36.2828],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Coelemu",
        region: "Ñuble",
        tipo_vegetacion: "Bosque Mixto",
        area_ha: 21365.88,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.7542, -36.4863],
            [-72.6542, -36.4863],
            [-72.6542, -36.3863],
            [-72.7542, -36.3863],
            [-72.7542, -36.4863],
          ],
        ],
      },
    },
  ],
}

// Extraer los centros de las comunas para los marcadores
const comunasCenters = nubleComunasGeoJson.features.map((feature) => {
  const coords = feature.geometry.coordinates[0]
  // Calcular el centro del polígono
  const lats = coords.map((coord) => coord[1])
  const lngs = coords.map((coord) => coord[0])
  const centerLat = lats.reduce((a, b) => a + b) / lats.length
  const centerLng = lngs.reduce((a, b) => a + b) / lngs.length

  return {
    name: feature.properties.name,
    position: { lat: centerLat, lng: centerLng },
    tipo_vegetacion: feature.properties.tipo_vegetacion,
    area_ha: feature.properties.area_ha,
  }
})

interface MapÑubleProps {
  data: FireData[]
  year: number
  selectedCommune: string
  selectedVegetationTypes: string[]
}

const MapÑuble = ({ data, year, selectedCommune, selectedVegetationTypes }: MapÑubleProps) => {
  const mapRef = useRef<google.maps.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [markers, setMarkers] = useState<React.ReactNode[]>([])

  // Función para crear el control personalizado
  const createRegionControl = (map: google.maps.Map) => {
    const controlDiv = document.createElement("div")

    // Estilo para el control
    controlDiv.style.backgroundColor = "#fff"
    controlDiv.style.border = "2px solid #fff"
    controlDiv.style.borderRadius = "3px"
    controlDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)"
    controlDiv.style.cursor = "pointer"
    controlDiv.style.marginTop = "10px"
    controlDiv.style.marginRight = "10px"
    controlDiv.style.textAlign = "center"

    // Estilo para el texto
    const controlText = document.createElement("div")
    controlText.style.color = "rgb(25,25,25)"
    controlText.style.fontFamily = "Sora, sans-serif"
    controlText.style.fontSize = "16px"
    controlText.style.lineHeight = "38px"
    controlText.style.paddingLeft = "5px"
    controlText.style.paddingRight = "5px"
    controlText.innerHTML = "Región Ñuble"

    controlDiv.appendChild(controlText)

    // Agregar el control al mapa
    controlDiv.index = 1
    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(controlDiv)
  }

  // Eliminar la constante filteredComunas fuera de los efectos y moverla dentro del useEffect

  // Reemplazar el useEffect actual con este:
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    // Mover el cálculo dentro del useEffect para evitar dependencias inestables
    const filteredComunas = comunasCenters.filter((comuna) => {
      // Filtrar por comuna si se ha seleccionado una específica
      if (selectedCommune !== "Todas" && comuna.name !== selectedCommune) {
        return false
      }

      // Filtrar por tipo de vegetación
      if (!selectedVegetationTypes.includes(comuna.tipo_vegetacion)) {
        return false
      }

      return true
    })

    // Crear marcadores para las comunas filtradas
    const comunasMarkers = filteredComunas.map((comuna, index) => {
      // Determinar si esta comuna está en el área afectada basado en los datos
      const isAffectedArea = data.some(
        (item) => item.commune === comuna.name && item.vegetationType === comuna.tipo_vegetacion,
      )

      // Usar el icono SVG personalizado para los touchpoints
      const customIcon = {
        url: TOUCHPOINT_SVG_URL,
        scaledSize: new google.maps.Size(30, 30), // Ajustar tamaño según necesidad
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 15), // Centrar el icono en la ubicación
      }

      // Usar las coordenadas exactas de communeCoordinates en lugar de las calculadas
      const exactPosition = communeCoordinates[comuna.name as keyof typeof communeCoordinates] || comuna.position

      return (
        <Marker
          key={`comuna-${index}`}
          position={exactPosition}
          icon={customIcon}
          title={comuna.name}
          onClick={() => {
            if (mapRef.current) {
              const vegColor = vegetationColors[comuna.tipo_vegetacion].color
              const areaColor = vegetationColors["Área Afectada"].color

              // Crear un estilo personalizado para la ventana de información
              const infoWindowStyle = `
                <style>
                  .info-window {
                    font-family: 'Sora', sans-serif;
                    padding: 8px;
                  }
                  .info-window h3 {
                    margin: 0 0 8px;
                    font-weight: bold;
                    font-family: 'Sora', sans-serif;
                  }
                  .info-window p {
                    margin: 0 0 4px;
                    font-family: 'Sora', sans-serif;
                  }
                  .info-window .warning {
                    margin: 4px 0 0;
                    color: #d97706;
                    font-weight: bold;
                  }
                </style>
              `

              const infoWindow = new window.google.maps.InfoWindow({
                content: `
                ${infoWindowStyle}
                <div class="info-window">
                  <h3>${comuna.name}</h3>
                  <p>
                    <strong>${vegetationColors[comuna.tipo_vegetacion].symbol} Tipo de vegetación:</strong> ${comuna.tipo_vegetacion}
                  </p>
                  <p>
                    <strong>${vegetationColors["Área Afectada"].symbol} Área afectada:</strong> ${comuna.area_ha} hectáreas
                  </p>
                  ${isAffectedArea ? `<p class="warning">⚠️ Área con impacto por incendio</p>` : ""}
                </div>
                `,
              })
              infoWindow.open({
                map: mapRef.current,
                anchor: null,
              })
              infoWindow.setPosition(exactPosition)
            }
          }}
        />
      )
    })

    // Establecer los marcadores de comunas
    setMarkers(comunasMarkers)
  }, [mapLoaded, selectedCommune, selectedVegetationTypes, data, communeCoordinates])

  // Reemplazar la función onLoad actual con esta:
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map

    try {
      // Usar el GeoJSON embebido directamente
      map.data.addGeoJson(nubleComunasGeoJson)

      // Hacer los polígonos completamente invisibles
      map.data.setStyle({
        visible: false,
        fillOpacity: 0,
        strokeWeight: 0,
      })

      // Agregar el control personalizado
      createRegionControl(map)

      setMapLoaded(true)
    } catch (error) {
      console.error("Error al añadir GeoJSON al mapa:", error)
    }

    setLoading(false)
  }, [])

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerÑuble}
          zoom={9}
          onLoad={onLoad}
          options={{
            mapTypeId: "terrain",
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            // Restricción para limitar la navegación solo a la Región de Ñuble
            restriction: {
              latLngBounds: nubleBounds,
              strictBounds: true,
            },
            // Limitar el nivel de zoom para evitar que se aleje demasiado
            minZoom: 8,
            maxZoom: 15,
          }}
        >
          {/* Renderizar los marcadores solo cuando el mapa esté cargado */}
          {mapLoaded && markers}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapÑuble

