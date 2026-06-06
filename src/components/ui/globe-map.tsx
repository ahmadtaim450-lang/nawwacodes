"use client"

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

export function GlobeMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [45, 25],
      zoom: 1.5,
      attributionControl: false,
      interactive: true,
      dragRotate: true,
    } as any)

    map.on("load", () => {
      ;(map as any).setFog?.({
        color: "rgb(0, 0, 0)",
        "high-color": "rgb(20, 50, 100)",
        "horizon-blend": 0.1,
      })
      ;(map as any).setProjection?.({ type: "globe" })

      map.addControl(new maplibregl.NavigationControl(), "bottom-right")

      const locations = [
        { lng: 55.2708, lat: 25.2048, label: "Dubai", color: "#22c55e" },
        { lng: 46.6753, lat: 24.7136, label: "Riyadh", color: "#22c55e" },
        { lng: -0.1276, lat: 51.5074, label: "London", color: "#3b82f6" },
        { lng: -74.006, lat: 40.7128, label: "New York", color: "#8b5cf6" },
        { lng: 139.6503, lat: 35.6762, label: "Tokyo", color: "#8b5cf6" },
      ]

      locations.forEach((loc) => {
        const el = document.createElement("div")
        el.className = "relative flex flex-col items-center"
        el.innerHTML = `
          <div style="width:12px;height:12px;background:${loc.color};border-radius:50%;border:2px solid white;box-shadow:0 0 12px ${loc.color}"></div>
          <span style="color:white;font-size:10px;margin-top:2px;text-shadow:0 0 4px black;white-space:nowrap">${loc.label}</span>
        `
        new maplibregl.Marker({ element: el } as any)
          .setLngLat([loc.lng, loc.lat])
          .addTo(map)
      })
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full rounded-3xl overflow-hidden border border-white/[0.06]" />
}
