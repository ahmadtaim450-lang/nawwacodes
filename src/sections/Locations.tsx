"use client"

import { useRef, useState, useEffect, Suspense, lazy } from "react"
import { motion, useInView } from "framer-motion"
import { Globe } from "lucide-react"

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
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (isInView && !shouldLoad) setShouldLoad(true)
  }, [isInView, shouldLoad])

  return (
    <section id="locations" ref={ref} className="relative py-20 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
            <Globe className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-400">Global Reach</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              WHERE WE ARE LOCATED
            </span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-base md:text-lg">
            Rooted in the Middle East, serving clients across the globe — from
            London to Tokyo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="h-[450px] md:h-[550px] rounded-3xl overflow-hidden border border-white/[0.06]"
        >
          {shouldLoad ? (
            <Suspense fallback={<div className="w-full h-full bg-white/[0.02] animate-pulse" />}>
              <MapAsync center={[hub.lng, hub.lat]} zoom={1.5} projection={{ type: "globe" } as any}>
                <MapArcAsync
                  data={arcs}
                  curvature={0.35}
                  paint={{ "line-color": "#3b82f6", "line-width": 1.5, "line-opacity": 0.5, "line-dasharray": [2, 2] }}
                />
                <MapMarkerAsync longitude={hub.lng} latitude={hub.lat}>
                  <MarkerContentAsync>
                    <div className="size-3 rounded-full border-2 border-white bg-blue-500 shadow-md shadow-blue-500/50" />
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

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["Middle East", "Europe", "North America", "Asia Pacific", "Australia"].map((region) => (
            <span key={region} className="px-4 py-1.5 text-xs rounded-full border border-white/[0.08] bg-white/[0.02] text-neutral-400">
              {region}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
