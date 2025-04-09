import type React from "react"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = {
  title: "PlanSat - Dashboard de Impacto de Incendios",
  description: "Análisis de vegetación afectada por incendios forestales",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${sora.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'