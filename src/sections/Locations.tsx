"use client"

import { useRef, useState, useEffect, Suspense, lazy } from "react"
import { motion, useInView } from "framer-motion"
import { Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { StarsBackground } from "@/components/ui/stars"

const MapAsync = lazy(() =>
  import("@/components/ui/mapcn-map-arc").then((m) => ({ default: m.Map }))
)
const MapMarkerAsync = lazy(() =>
  import("@/components/ui/mapcn-map-arc").then((m) => ({ default: m.MapMarker }))
)
const MarkerContentAsync = lazy(() =>
  import("@/components/ui/mapcn-map-arc").then((m) => ({ default: m.MarkerContent }))
)
const MarkerLabelAsync = lazy(() =>
  import("@/components/ui/mapcn-map-arc").then((m) => ({ default: m.MarkerLabel }))
)
const MapArcAsync = lazy(() =>
  import("@/components/ui/mapcn-map-arc").then((m) => ({ default: m.MapArc }))
)

const hub = { name: "Dubai", lng: 55.2708, lat: 25.2048 }

const destinations = [
  { name: "London", lng: -0.1276, lat: 51.5074 },
  { name: "Frankfurt", lng: 8.6821, lat: 50.1109 },
  { name: "New York", lng: -74.006, lat: 40.7128 },
  { name: "Berlin", lng: 13.405, lat: 52.52 },
  { name: "Riyadh", lng: 46.6753, lat: 24.7136 },
  { name: "Latakia", lng: 35.7878, lat: 35.5235 },
  { name: "Tokyo", lng: 139.6917, lat: 35.6895 },
  { name: "Sydney", lng: 151.2093, lat: -33.8688 },
  { name: "Singapore", lng: 103.8198, lat: 1.3521 },
  { name: "Mumbai", lng: 72.8777, lat: 19.076 },
]

const arcs = destinations.map((dest) => ({
  id: dest.name,
  from: [hub.lng, hub.lat] as [number, number],
  to: [dest.lng, dest.lat] as [number, number],
}))

export function Locations() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (isInView && !shouldLoad) setShouldLoad(true)
  }, [isInView, shouldLoad])

  return (
    <section id="locations" ref={ref} className="relative py-20 md:py-32 bg-black overflow-hidden">
      <StarsBackground className="absolute inset-0 opacity-30" starColor="#fff" speed={80} factor={0.02} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <Globe className="w-4 h-4 text-neutral-400" />
              <span className="text-sm text-neutral-400">{t.locations.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                {t.locations.title}
              </span>
            </h2>
            <p className="text-orange-400/80 text-base md:text-lg leading-relaxed max-w-md">
              {t.locations.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {["Middle East", "Europe", "North America", "Asia Pacific", "Australia"].map((region) => (
                <span key={region} className="px-4 py-1.5 text-xs rounded-full border border-white/[0.08] bg-white/[0.02] text-neutral-400">
                  {region}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="h-[350px] sm:h-[400px] lg:h-[500px]"
          >
            {shouldLoad ? (
              <Suspense fallback={<div className="w-full h-full bg-white/[0.02] animate-pulse rounded-full" />}>
                <MapAsync center={[hub.lng, hub.lat]} zoom={1.5} projection={{ type: "globe" } as any}>
                  <MapArcAsync
                    data={arcs}
                    curvature={0.35}
                    paint={{ "line-color": "#f97316", "line-width": 1.5, "line-opacity": 0.5, "line-dasharray": [2, 2] }}
                  />
                  <MapMarkerAsync longitude={hub.lng} latitude={hub.lat}>
                    <MarkerContentAsync>
                      <div className="size-3 rounded-full border-2 border-white bg-orange-500 shadow-md shadow-orange-500/50" />
                      <MarkerLabelAsync position="top" className="bg-black/80 rounded-sm px-1.5 py-0.5 text-[11px] font-semibold backdrop-blur">
                        {hub.name}
                      </MarkerLabelAsync>
                    </MarkerContentAsync>
                  </MapMarkerAsync>
                  {destinations.map((dest) => (
                    <MapMarkerAsync key={dest.name} longitude={dest.lng} latitude={dest.lat}>
                      <MarkerContentAsync>
                        <div className="size-2 rounded-full border-2 border-white bg-emerald-500 shadow shadow-emerald-500/50" />
                        <MarkerLabelAsync position="top">{dest.name}</MarkerLabelAsync>
                      </MarkerContentAsync>
                    </MapMarkerAsync>
                  ))}
                </MapAsync>
              </Suspense>
            ) : (
              <div className="w-full h-full bg-white/[0.02]" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
