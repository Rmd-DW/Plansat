"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface LoadingScreenProps {
  onLoadComplete?: () => void
  minDisplayTime?: number
}

export default function LoadingScreen({ onLoadComplete, minDisplayTime = 3000 }: LoadingScreenProps) {
  const [dots, setDots] = useState(1)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Animación de los puntos
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev >= 8 ? 1 : prev + 1))
    }, 300)

    // Asegurar un tiempo mínimo de visualización
    const timer = setTimeout(() => {
      setIsComplete(true)
      if (onLoadComplete) {
        onLoadComplete()
      }
    }, minDisplayTime)

    return () => {
      clearInterval(dotsInterval)
      clearTimeout(timer)
    }
  }, [onLoadComplete, minDisplayTime])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #520DC2 0%, #3B0A8F 50%, #250659 100%)",
      }}
    >
      <div className="relative h-16 w-64 mb-8">
        <Link href="/dashboard">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-FE1MGS6isFplG4BZ1WYezlE61Ypq3j.png"
            alt="PLANSAT Logo"
            fill
            className="object-contain brightness-0 invert cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${i < dots ? "bg-white" : "bg-white/30"} transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  )
}

