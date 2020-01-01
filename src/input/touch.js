import { merge, fromEvents } from 'kefir'
import signal from './signal.js'

document.addEventListener('touchstart', e => {
  e.preventDefault()
}, {
  passive: false
})

export default {
  down: signal((
    merge([
      fromEvents(document, 'touchstart').map(() => 1),
      fromEvents(document, 'touchend').map(() => 0)
    ])
  ), 0),

  x: signal(
    merge([
      fromEvents(document, 'touchmove').map(e => e.changedTouches[0].clientX / window.innerWidth),
      fromEvents(document, 'touchstart').map(e => e.changedTouches[0].clientX / window.innerWidth)
    ])
  ),

  y: signal(
    merge([
      fromEvents(document, 'touchmove').map(e => e.changedTouches[0].clientY / window.innerHeight),
      fromEvents(document, 'touchstart').map(e => e.changedTouches[0].clientY / window.innerHeight)
    ])
  )
}
