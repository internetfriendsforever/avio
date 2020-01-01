import { stream as kefirStream, merge, fromEvents } from 'kefir'
import stream from './stream'

document.addEventListener('touchstart', e => {
  e.preventDefault()
}, {
  passive: false
})

export default {
  down: stream((
    merge([
      fromEvents(document, 'touchstart').map(() => 1),
      fromEvents(document, 'touchend').map(() => 0)
    ])
  ), 0),

  x: stream(
    merge([
      fromEvents(document, 'touchmove').map(e => e.changedTouches[0].clientX / window.innerWidth),
      fromEvents(document, 'touchstart').map(e => e.changedTouches[0].clientX / window.innerWidth)
    ])
  ),

  y: stream(
    merge([
      fromEvents(document, 'touchmove').map(e => e.changedTouches[0].clientY / window.innerHeight),
      fromEvents(document, 'touchstart').map(e => e.changedTouches[0].clientY / window.innerHeight)
    ])
  )
}
