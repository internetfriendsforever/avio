import { stream, interval } from 'kefir'
import signal from './signal.js'

export default {
  frame: signal((
    stream(emitter => {
      let frame = 0

      function tick () {
        emitter.emit(frame++)
        requestAnimationFrame(tick)
      }

      tick()
    })
  ), 0),

  interval: ms => signal((
    interval(ms, 1).scan((prev, next) => next + prev)
  ), 0),
}
