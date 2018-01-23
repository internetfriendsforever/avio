import { stream as kefirStream, merge, fromEvents } from 'kefir'
import stream from './stream'

import Hammer from 'hammerjs'

const hammer = new Hammer(document)

document.addEventListener('touchstart', e => {
  e.preventDefault()
}, {
  passive: false
})

export default {
  tap: stream((
    kefirStream(emitter => {
      hammer.on('tap', e => {
        emitter.emit(1)
        setTimeout(() => {
          emitter.emit(0)
        }, e.deltaTime)
      })
    })
  ), 0),

  swipe: stream((
    kefirStream(emitter => {
      hammer.on('swipe', e => {
        setTimeout(() => {
          emitter.emit(1)
          setTimeout(() => {
            emitter.emit(0)
          }, e.deltaTime)
        }, 100)
      })
    })
  ), 0),

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
