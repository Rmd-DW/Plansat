"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart2, Map, FileText, Shield, ChevronRight, Flame, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-FE1MGS6isFplG4BZ1WYezlE61Ypq3j.png"
                alt="PLANSAT Logo"
                width={120}
                height={32}
                className="object-contain cursor-pointer"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-primary">
              Acerca de
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Características
            </Link>
            <Link href="#modules" className="text-sm font-medium hover:text-primary">
              Módulos
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/loading">
              <Button>Acceder</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0"></div>
        <div className="container relative z-10 py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Monitoreo y Análisis de Impacto de Incendios Forestales
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[700px] mx-auto">
              PLANSAT proporciona herramientas avanzadas para el análisis de vegetación afectada por incendios
              forestales en la Región de Ñuble, Chile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/loading">
                <Button size="lg" className="w-full sm:w-auto">
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#modules">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Ver módulos
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-12 md:mt-16 relative w-full max-w-5xl aspect-[16/9] rounded-lg overflow-hidden border shadow-lg">
            <Image
              src="/images/imagen_hero1.png"
              alt="PLANSAT Mapa Interactivo - Visualización satelital"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-4 md:p-6 text-white text-left">
                <h3 className="text-xl md:text-2xl font-bold">Mapa Interactivo</h3>
                <p className="text-sm md:text-base opacity-90">
                  Visualización geoespacial de datos de incendios forestales
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-12 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-4">Características Principales</h2>
          <p className="text-muted-foreground text-lg max-w-[700px] mx-auto">
            PLANSAT ofrece herramientas avanzadas para el análisis y monitoreo de incendios forestales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Map className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Visualización Geoespacial</h3>
                <p className="text-muted-foreground">
                  Mapas interactivos que muestran la distribución de incendios y áreas afectadas en la Región de Ñuble.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Análisis Estadístico</h3>
                <p className="text-muted-foreground">
                  Gráficos y estadísticas detalladas sobre la evolución de incendios y tipos de vegetación afectada.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Generación de Reportes</h3>
                <p className="text-muted-foreground">
                  Creación de informes personalizados en formato PDF con datos detallados para toma de decisiones.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Monitoreo de Impacto</h3>
                <p className="text-muted-foreground">
                  Seguimiento del impacto de incendios en diferentes tipos de vegetación y ecosistemas.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Análisis Temporal</h3>
                <p className="text-muted-foreground">
                  Comparación de datos históricos para identificar patrones y tendencias en incendios forestales.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Soporte Técnico</h3>
                <p className="text-muted-foreground">
                  Asistencia especializada para usuarios y capacitación en el uso de la plataforma.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-12 md:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-4">Módulos de la Plataforma</h2>
            <p className="text-muted-foreground text-lg max-w-[700px] mx-auto">
              Explore las diferentes secciones de PLANSAT diseñadas para un análisis completo de incendios forestales.
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto">
              <TabsTrigger
                value="dashboard"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Análisis
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Reportes
              </TabsTrigger>
              <TabsTrigger
                value="support"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Soporte
              </TabsTrigger>
            </TabsList>

            <div className="mt-8 bg-card rounded-lg border overflow-hidden">
              <TabsContent value="dashboard" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Mapa Interactivo</h3>
                    <p className="text-muted-foreground mb-6">
                      Visualice datos geoespaciales de incendios forestales en la Región de Ñuble con mapas
                      interactivos, filtros avanzados y gráficos dinámicos que muestran la distribución de áreas
                      afectadas.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Mapa interactivo de la Región de Ñuble</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Filtros por año, comuna y tipo de vegetación</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Gráficos de evolución temporal</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted relative min-h-[300px]">
                    {/* Espacio reservado para una nueva imagen que se agregará después */}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Análisis Comparativo</h3>
                    <p className="text-muted-foreground mb-6">
                      Compare datos entre diferentes períodos para identificar tendencias y patrones en la ocurrencia de
                      incendios forestales y su impacto en distintos tipos de vegetación.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Comparación Histórica</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Estadísticas detalladas por tipo de vegetación</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Gráficos comparativos de áreas afectadas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Análisis predictivo</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted relative min-h-[300px]">
                    <Image
                      src="/placeholder.svg?height=600&width=800"
                      alt="Análisis Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Generación de Reportes</h3>
                    <p className="text-muted-foreground mb-6">
                      Cree informes personalizados en formato PDF con datos detallados sobre incendios forestales, áreas
                      afectadas y estadísticas relevantes para la toma de decisiones.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Reportes personalizados por año y comuna</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Exportación en formato PDF</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Tablas y gráficos detallados</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted relative min-h-[300px]">
                    <Image
                      src="/placeholder.svg?height=600&width=800"
                      alt="Reportes Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="support" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Soporte Técnico</h3>
                    <p className="text-muted-foreground mb-6">
                      Acceda a asistencia especializada y recursos de capacitación para aprovechar al máximo las
                      funcionalidades de PLANSAT en el análisis de incendios forestales.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Formulario de contacto directo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Documentación técnica</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>Capacitación personalizada</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted relative min-h-[300px]">
                    <Image
                      src="/placeholder.svg?height=600&width=800"
                      alt="Soporte Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-12 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-4">Impacto de Incendios Forestales</h2>
          <p className="text-muted-foreground text-lg max-w-[700px] mx-auto">
            Estadísticas clave sobre incendios forestales en la Región de Ñuble a lo largo de los años.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">124,266</h3>
              <p className="text-lg font-medium">Hectáreas afectadas</p>
              <p className="text-sm text-muted-foreground">en 2017</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">32,662</h3>
              <p className="text-lg font-medium">Hectáreas afectadas</p>
              <p className="text-sm text-muted-foreground">en 2007</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">3,615</h3>
              <p className="text-lg font-medium">Hectáreas afectadas</p>
              <p className="text-sm text-muted-foreground">en 1986</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-12 md:py-24">
        <div className="container text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-4">
            Comience a utilizar PLANSAT hoy mismo
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-[700px] mx-auto mb-8">
            Acceda a datos detallados sobre incendios forestales y su impacto en la vegetación de la Región de Ñuble.
          </p>
          <Link href="/loading">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
              Acceder
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/dashboard">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-FE1MGS6isFplG4BZ1WYezlE61Ypq3j.png"
                  alt="PLANSAT Logo"
                  width={120}
                  height={32}
                  className="object-contain mb-4 cursor-pointer"
                />
              </Link>
              <p className="text-sm text-muted-foreground">
                Plataforma de análisis de vegetación afectada por incendios forestales en la Región de Ñuble, Chile.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Plataforma</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/loading" className="text-sm text-muted-foreground hover:text-primary">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/loading?section=analisis" className="text-sm text-muted-foreground hover:text-primary">
                    Análisis
                  </Link>
                </li>
                <li>
                  <Link href="/loading?section=reportes" className="text-sm text-muted-foreground hover:text-primary">
                    Reportes
                  </Link>
                </li>
                <li>
                  <Link href="/loading?section=soporte" className="text-sm text-muted-foreground hover:text-primary">
                    Soporte
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Documentación
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Guías de usuario
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Preguntas frecuentes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">Email: info@plansat.cl</li>
                <li className="text-sm text-muted-foreground">Teléfono: +56 42 123 4567</li>
                <li className="text-sm text-muted-foreground">Dirección: Chillán, Región de Ñuble, Chile</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 PLANSAT. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Términos de servicio
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Política de privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

