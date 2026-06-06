import { Component, Suspense, lazy, type ReactNode } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="w-full h-full flex items-center justify-center bg-black/50 rounded-xl border border-white/[0.06]">
            <p className="text-neutral-500 text-sm">3D scene unavailable</p>
          </div>
        )
      )
    }
    return this.props.children
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SplineErrorBoundary>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  )
}
