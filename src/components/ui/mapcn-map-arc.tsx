"use client";

import MapLibreGL, { type MarkerOptions } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

type MapViewport = {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
};

type MapRef = MapLibreGL.Map;

type MapProps = {
  children?: ReactNode;
  className?: string;
  projection?: MapLibreGL.ProjectionSpecification;
  viewport?: Partial<MapViewport>;
  onViewportChange?: (viewport: MapViewport) => void;
  loading?: boolean;
} & Omit<MapLibreGL.MapOptions, "container" | "style">;

function DefaultLoader() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
      <div className="flex gap-1">
        <span className="size-1.5 animate-pulse rounded-full bg-white/60" />
        <span className="size-1.5 animate-pulse rounded-full bg-white/60 [animation-delay:150ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-white/60 [animation-delay:300ms]" />
      </div>
    </div>
  );
}

const Map = forwardRef<MapRef, MapProps>(function Map(
  {
    children,
    className,
    projection,
    viewport,
    onViewportChange,
    loading = false,
    ...props
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<MapLibreGL.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useImperativeHandle(ref, () => mapInstance as MapLibreGL.Map, [mapInstance]);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      attributionControl: false,
      ...(viewport ?? {}),
      ...(props as any),
    });

    const loadHandler = () => setIsLoaded(true);
    map.on("load", loadHandler);
    setMapInstance(map);

    if (projection) {
      map.on("style.load", () => (map as any).setProjection?.(projection));
    }

    return () => {
      map.off("load", loadHandler);
      map.remove();
      setIsLoaded(false);
      setMapInstance(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(
    () => ({ map: mapInstance, isLoaded }),
    [mapInstance, isLoaded],
  );

  return (
    <MapContext.Provider value={contextValue}>
      <div ref={containerRef} className={cn("relative h-full w-full", className)}>
        {(!isLoaded || loading) && <DefaultLoader />}
        {mapInstance && children}
      </div>
    </MapContext.Provider>
  );
});

type MarkerContextValue = {
  marker: MapLibreGL.Marker;
  map: MapLibreGL.Map | null;
};

const MarkerContext = createContext<MarkerContextValue | null>(null);

function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) throw new Error("Marker components must be used within MapMarker");
  return context;
}

type MapMarkerProps = {
  longitude: number;
  latitude: number;
  children: ReactNode;
} & Omit<MarkerOptions, "element">;

function MapMarker({ longitude, latitude, children, ...markerOptions }: MapMarkerProps) {
  const { map } = useMap();
  const marker = useMemo(() => {
    const m = new MapLibreGL.Marker({
      ...(markerOptions as any),
      element: document.createElement("div"),
    }).setLngLat([longitude, latitude]);
    return m;
  }, []);

  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => { marker.remove(); };
  }, [map, marker]);

  return (
    <MarkerContext.Provider value={{ marker, map }}>
      {children}
    </MarkerContext.Provider>
  );
}

type MarkerContentProps = { children?: ReactNode; className?: string };

function MarkerContent({ children, className }: MarkerContentProps) {
  const { marker } = useMarkerContext();
  return createPortal(
    <div className={cn("relative cursor-pointer", className)}>{children}</div>,
    marker.getElement(),
  );
}

type MarkerLabelProps = {
  children: ReactNode;
  className?: string;
  position?: "top" | "bottom";
};

function MarkerLabel({ children, className, position = "top" }: MarkerLabelProps) {
  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-white",
        position === "top" ? "bottom-full mb-1" : "top-full mt-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

type MapArcDatum = {
  id: string | number;
  from: [number, number];
  to: [number, number];
};

type MapArcProps = {
  data: MapArcDatum[];
  curvature?: number;
  paint?: Record<string, unknown>;
};

function buildArcCoords(from: [number, number], to: [number, number], curvature: number, samples: number): [number, number][] {
  const [x0, y0] = from;
  const [x2, y2] = to;
  const dx = x2 - x0;
  const dy = y2 - y0;
  const dist = Math.hypot(dx, dy);
  if (dist === 0 || curvature === 0) return [from, to];
  const mx = (x0 + x2) / 2;
  const my = (y0 + y2) / 2;
  const nx = -dy / dist;
  const ny = dx / dist;
  const offset = dist * curvature;
  const cx = mx + nx * offset;
  const cy = my + ny * offset;
  const pts: [number, number][] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const inv = 1 - t;
    pts.push([inv * inv * x0 + 2 * inv * t * cx + t * t * x2, inv * inv * y0 + 2 * inv * t * cy + t * t * y2]);
  }
  return pts;
}

function MapArc({ data, curvature = 0.3, paint }: MapArcProps) {
  const { map, isLoaded } = useMap();
  const id = useId();
  const sourceId = `arc-src-${id}`;
  const layerId = `arc-layer-${id}`;

  const geoJSON = useMemo(() => ({
    type: "FeatureCollection" as const,
    features: data.map((arc) => ({
      type: "Feature" as const,
      properties: { id: arc.id },
      geometry: { type: "LineString" as const, coordinates: buildArcCoords(arc.from, arc.to, curvature, 64) },
    })),
  }), [data, curvature]);

  useEffect(() => {
    if (!isLoaded || !map) return;
    map.addSource(sourceId, { type: "geojson", data: geoJSON, promoteId: "id" } as any);
    map.addLayer({
      id: layerId,
      type: "line",
      source: sourceId,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: { "line-color": "#f97316", "line-width": 1.5, "line-opacity": 0.6, ...paint },
    });
    return () => {
      try { map.getLayer(layerId) && map.removeLayer(layerId); map.getSource(sourceId) && map.removeSource(sourceId); } catch {}
    };
  }, [isLoaded, map]);

  useEffect(() => {
    if (!isLoaded || !map) return;
    const src = map.getSource(sourceId) as MapLibreGL.GeoJSONSource | undefined;
    src?.setData(geoJSON as any);
  }, [geoJSON]);

  return null;
}

export { Map, useMap, MapMarker, MarkerContent, MarkerLabel, MapArc };
export type { MapRef, MapViewport, MapArcDatum };
