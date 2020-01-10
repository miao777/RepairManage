export function initCanvas(canvas) {
  let af
  const numLasers = 66
  const tail = 200
  const ctx = canvas.getContext('2d')
  const createLasers = n => {
    const lasers = []
    for (let i = 0; i < n; ++i) {
      lasers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: -(Math.random() * 2 + 1)
      })
    }
    return lasers
  }
  const renderLaser = l => {
    const grad = ctx.createLinearGradient(l.x, l.y, l.x, l.y + tail)
    const a = 1 - (canvas.height - l.y) / canvas.height * 0.8
    grad.addColorStop(0, 'hsla(340,100%,50%,0)')
    grad.addColorStop(1, `hsla(340,100%,100%,${a})`)
    ctx.strokeStyle = grad
    ctx.beginPath()
    ctx.moveTo(l.x, l.y)
    ctx.lineTo(l.x, l.y + tail)
    ctx.stroke()
  }
  const updateLaser = l => {
    l.y -= l.s
    if (l.y > canvas.height) {
      l.y = 0
    }
  }
  const render = lasers => {
    ctx.fillStyle = 'hsl(261,43%,7%)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (const l of lasers) {
      renderLaser(l)
      updateLaser(l)
    }
    af = requestAnimationFrame(() => render(lasers))
  }
  const init = () => {
    cancelAnimationFrame(af)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    render(createLasers(numLasers))
  }
  window.onresize = init
  init()
}
