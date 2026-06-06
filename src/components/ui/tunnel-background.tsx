"use client"

import * as THREE from "three"
import { useRef, useEffect, useCallback } from "react"

const vertexShader = `void main(){ gl_Position = vec4(position, 1.0); }`

const fragmentShader = `
uniform float iTime;
uniform vec3 iResolution;

#define TAU 6.2831853071795865
#define TUNNEL_LAYERS 64
#define RING_POINTS 128
#define POINT_SIZE 1.8
#define SPEED 0.4

float sq(float x){ return x*x; }

vec2 AngRep(vec2 uv, float angle){
  vec2 polar = vec2(atan(uv.y, uv.x), length(uv));
  polar.x = mod(polar.x + angle/2.0, angle) - angle/2.0;
  return polar.y * vec2(cos(polar.x), sin(polar.x));
}

float sdCircle(vec2 uv, float r){ return length(uv) - r; }

vec3 MixShape(float sd, vec3 fill, vec3 target){
  float blend = smoothstep(0.0, 1.0/iResolution.y, sd);
  return mix(fill, target, blend);
}

vec2 TunnelPath(float x){
  vec2 offs = vec2(
    0.2 * sin(TAU * x * 0.5) + 0.4 * sin(TAU * x * 0.2 + 0.3),
    0.3 * cos(TAU * x * 0.3) + 0.2 * cos(TAU * x * 0.1)
  );
  offs *= smoothstep(1.0, 4.0, x);
  return offs;
}

void main(){
  vec2 res = iResolution.xy / iResolution.y;
  vec2 uv = gl_FragCoord.xy / iResolution.y - res/2.0;
  vec3 color = vec3(0.0);
  float repAngle = TAU / float(RING_POINTS);
  float pointSize = POINT_SIZE / (2.0 * iResolution.y);
  float camZ = iTime * SPEED;
  vec2 camOffs = TunnelPath(camZ);

  for(int i = 1; i <= TUNNEL_LAYERS; i++){
    float pz = 1.0 - (float(i) / float(TUNNEL_LAYERS));
    pz -= mod(camZ, 4.0 / float(TUNNEL_LAYERS));
    vec2 offs = TunnelPath(camZ + pz) - camOffs;
    float ringRad = 0.15 * (1.0 / sq(pz * 0.8 + 0.4));
    if(abs(length(uv + offs) - ringRad) < pointSize * 1.5){
      vec2 aruv = AngRep(uv + offs, repAngle);
      float pdist = sdCircle(aruv - vec2(ringRad, 0), pointSize);
      float shade = (1.0 - pz) * 0.3;
      vec3 ptColor = (mod(float(i/2), 2.0) == 0.0) ? vec3(0.4, 0.5, 1.0) : vec3(0.2, 0.6, 0.5);
      color = MixShape(pdist, ptColor * shade, color);
    }
  }

  gl_FragColor = vec4(color, 1.0);
}
`

type ThreeContext = {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.OrthographicCamera
  material: THREE.ShaderMaterial
  mesh: THREE.Mesh
}

function createThree(canvas: HTMLCanvasElement, w: number, h: number): ThreeContext {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(w, h)

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const material = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(w, h, 1) },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
  })
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  scene.add(mesh)
  return { renderer, scene, camera, material, mesh }
}

export function TunnelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<ThreeContext | null>(null)
  const animRef = useRef<number>(0)
  const lastRef = useRef(0)

  const animate = useCallback((time: number) => {
    if (!ctxRef.current) return
    animRef.current = requestAnimationFrame(animate)
    const t = time * 0.001
    const delta = t - (lastRef.current || t)
    lastRef.current = t
    ctxRef.current.material.uniforms.iTime.value += delta * 0.3
    ctxRef.current.renderer.render(ctxRef.current.scene, ctxRef.current.camera)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const w = parent.clientWidth
    const h = parent.clientHeight
    const ctx = createThree(canvas, w, h)
    ctxRef.current = ctx

    const ro = new ResizeObserver(() => {
      const nw = parent.clientWidth
      const nh = parent.clientHeight
      ctx.renderer.setSize(nw, nh)
      ctx.material.uniforms.iResolution.value.set(nw, nh, 1)
    })
    ro.observe(parent)

    animRef.current = requestAnimationFrame(animate)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(animRef.current)
      ctx.mesh.geometry.dispose()
      ctx.material.dispose()
      ctx.renderer.dispose()
    }
  }, [animate])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
}
