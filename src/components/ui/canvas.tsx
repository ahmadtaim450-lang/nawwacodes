class Oscillator {
  phase: number
  offset: number
  frequency: number
  amplitude: number
  private _value = 0

  constructor(opts?: { phase?: number; offset?: number; frequency?: number; amplitude?: number }) {
    this.phase = opts?.phase ?? 0
    this.offset = opts?.offset ?? 0
    this.frequency = opts?.frequency ?? 0.001
    this.amplitude = opts?.amplitude ?? 1
  }

  update() {
    this.phase += this.frequency
    this._value = this.offset + Math.sin(this.phase) * this.amplitude
    return this._value
  }

  value() {
    return this._value
  }
}

class Node {
  x = 0
  y = 0
  vx = 0
  vy = 0
}

class Line {
  spring: number
  friction: number
  nodes: Node[]

  constructor(pos: { x: number; y: number }, config: typeof CONFIG) {
    this.spring = 0.45 + 0.1 * Math.random() - 0.05
    this.friction = config.friction + 0.01 * Math.random() - 0.005
    this.nodes = []
    for (let i = 0; i < config.size; i++) {
      const node = new Node()
      node.x = pos.x
      node.y = pos.y
      this.nodes.push(node)
    }
  }

  update(pos: { x: number; y: number }, config: typeof CONFIG) {
    let spring = this.spring
    const first = this.nodes[0]
    first.vx += (pos.x - first.x) * spring
    first.vy += (pos.y - first.y) * spring

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i]
      if (i > 0) {
        const prev = this.nodes[i - 1]
        node.vx += (prev.x - node.x) * spring
        node.vy += (prev.y - node.y) * spring
        node.vx += prev.vx * config.dampening
        node.vy += prev.vy * config.dampening
      }
      node.vx *= this.friction
      node.vy *= this.friction
      node.x += node.vx
      node.y += node.vy
      spring *= config.tension
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let x = this.nodes[0].x
    let y = this.nodes[0].y
    ctx.beginPath()
    ctx.moveTo(x, y)

    for (let i = 1; i < this.nodes.length - 1; i++) {
      const e = this.nodes[i]
      const t = this.nodes[i + 1]
      x = 0.5 * (e.x + t.x)
      y = 0.5 * (e.y + t.y)
      ctx.quadraticCurveTo(e.x, e.y, x, y)
    }
    const last = this.nodes[this.nodes.length - 1]
    ctx.quadraticCurveTo(last.x, last.y, last.x, last.y)
    ctx.stroke()
    ctx.closePath()
  }
}

const CONFIG = {
  friction: 0.5,
  trails: 60,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
}

let ctx: CanvasRenderingContext2D | null = null
let oscillator: Oscillator | null = null
let pos = { x: 0, y: 0 }
let lines: Line[] = []
let animationFrame = 0
let running = false

function initLines() {
  lines = []
  for (let i = 0; i < CONFIG.trails; i++) {
    lines.push(new Line(pos, CONFIG))
  }
}

function render() {
  if (!ctx || !running) return
  ctx.globalCompositeOperation = "source-over"
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.globalCompositeOperation = "lighter"
  ctx.strokeStyle = `hsla(${Math.round(oscillator!.update())},100%,50%,0.025)`
  ctx.lineWidth = 10

  for (let i = 0; i < CONFIG.trails; i++) {
    lines[i].update(pos, CONFIG)
    lines[i].draw(ctx)
  }
  animationFrame++
  requestAnimationFrame(render)
}

function resizeCanvas() {
  if (!ctx) return
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
}

function onMouseMove(e: MouseEvent | TouchEvent) {
  if ("touches" in e && e.touches.length === 1) {
    pos.x = e.touches[0].pageX
    pos.y = e.touches[0].pageY
  } else if ("clientX" in e) {
    pos.x = e.clientX
    pos.y = e.clientY
  }
}

export function renderCanvas() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null
  if (!canvas) return
  ctx = canvas.getContext("2d")
  if (!ctx) return
  running = true

  oscillator = new Oscillator({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  })

  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("touchmove", onMouseMove, { passive: true })
  document.addEventListener("touchstart", onMouseMove, { passive: true })
  window.addEventListener("resize", resizeCanvas)
  window.addEventListener("focus", () => {
    running = true
    render()
  })
  window.addEventListener("blur", () => {
    running = true
  })

  resizeCanvas()
  initLines()
  render()
}
