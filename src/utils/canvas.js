// export function initCanvas(canvas) {
//   let af
//   const numLasers = 66
//   const tail = 200
//   const ctx = canvas.getContext('2d')
//   const createLasers = n => {
//     const lasers = []
//     for (let i = 0; i < n; ++i) {
//       lasers.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         s: -(Math.random() * 2 + 1)
//       })
//     }
//     return lasers
//   }
//   const renderLaser = l => {
//     const grad = ctx.createLinearGradient(l.x, l.y, l.x, l.y + tail)
//     const a = 1 - (canvas.height - l.y) / canvas.height * 0.8
//     grad.addColorStop(0, 'hsla(340,100%,50%,0)')
//     grad.addColorStop(1, `hsla(340,100%,100%,${a})`)
//     ctx.strokeStyle = grad
//     ctx.beginPath()
//     ctx.moveTo(l.x, l.y)
//     ctx.lineTo(l.x, l.y + tail)
//     ctx.stroke()
//   }
//   const updateLaser = l => {
//     l.y -= l.s
//     if (l.y > canvas.height) {
//       l.y = 0
//     }
//   }
//   const render = lasers => {
//     ctx.fillStyle = 'hsl(261,43%,7%)'
//     ctx.fillRect(0, 0, canvas.width, canvas.height)
//     for (const l of lasers) {
//       renderLaser(l)
//       updateLaser(l)
//     }
//     af = requestAnimationFrame(() => render(lasers))
//   }
//   const init = () => {
//     cancelAnimationFrame(af)
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//     render(createLasers(numLasers))
//   }
//   window.onresize = init
//   init()
// }
import $ from 'jquery'
export function initCanvas(canvas) {
  $(document).ready(function() {
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')
    // var c = $('#canvas')
    var w, h
    var pi = Math.PI
    var all_attribute = {
      num: 100, // 个数
      start_probability: 0.1, // 如果数量小于num，有这些几率添加一个新的
      radius_min: 1, // 初始半径最小值
      radius_max: 2, // 初始半径最大值
      radius_add_min: 0.3, // 半径增加最小值
      radius_add_max: 0.5, // 半径增加最大值
      opacity_min: 0.3, // 初始透明度最小值
      opacity_max: 0.5, 				 // 初始透明度最大值
      opacity_prev_min: 0.003, // 透明度递减值最小值
      opacity_prev_max: 0.005, // 透明度递减值最大值
      light_min: 40, // 颜色亮度最小值
      light_max: 70 // 颜色亮度最大值
    }
    // var style_color = find_random(0, 360)
    var style_color = 160
    var all_element = []
    window_resize()
    function start() {
      window.requestAnimationFrame(start)
      // style_color += 0.1
      ctx.fillStyle = 'hsl(261,43%,7%)'
      ctx.fillRect(0, 0, w, h)
      if (all_element.length < all_attribute.num && Math.random() < all_attribute.start_probability) {
        all_element.push(new Ready_run())
      }
      all_element.map(function(line) {
        line.to_step()
      })
    }
    function Ready_run() {
      this.to_reset()
    }
    Ready_run.prototype = {
      to_reset: function() {
        var t = this
        t.x = find_random(0, w)
        t.y = find_random(0, h)
        t.radius = find_random(all_attribute.radius_min, all_attribute.radius_max)
        t.radius_change = find_random(all_attribute.radius_add_min, all_attribute.radius_add_max)
        t.opacity = find_random(all_attribute.opacity_min, all_attribute.opacity_max)
        t.opacity_change = find_random(all_attribute.opacity_prev_min, all_attribute.opacity_prev_max)
        t.light = find_random(all_attribute.light_min, all_attribute.light_max)
        t.color = 'hsl(' + style_color + ',100%,' + t.light + '%)'
      },
      to_step: function() {
        var t = this
        t.opacity -= t.opacity_change
        t.radius += t.radius_change
        if (t.opacity <= 0) {
          t.to_reset()
          return false
        }
        ctx.fillStyle = t.color
        ctx.globalAlpha = t.opacity
        ctx.beginPath()
        ctx.arc(t.x, t.y, t.radius, 0, 2 * pi, true)
        ctx.closePath()
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }
    function window_resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    $(window).resize(function() {
      window_resize()
    })
    function find_random(num_one, num_two) {
      return Math.random() * (num_two - num_one) + num_one
    }
    (function() {
      var lastTime = 0
      var vendors = ['webkit', 'moz']
      for (var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
        window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
                window[vendors[xx] + 'CancelRequestAnimationFrame']
      }

      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime()
          var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
          var id = window.setTimeout(function() {
            callback(currTime + timeToCall)
          }, timeToCall)
          lastTime = currTime + timeToCall
          return id
        }
      }
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
          clearTimeout(id)
        }
      }
    }())
    start()
  })
}
