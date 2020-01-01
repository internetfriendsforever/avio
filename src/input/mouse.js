import { fromEvents, merge } from 'kefir'
import signal from './signal.js'

export default {
  x: signal((
    fromEvents(window, 'mousemove')
      .map(e => e.clientX / window.innerWidth)
      .skipDuplicates()
  ), 0),

  y: signal((
    fromEvents(window, 'mousemove')
      .map(e => e.clientY / window.innerHeight)
      .skipDuplicates()
  ), 0),

  down: signal((
    merge([
      fromEvents(window, 'mousedown').map(() => 1),
      fromEvents(window, 'mouseup').map(() => 0)
    ])
  ), 0),

  up: signal((
    merge([
      fromEvents(window, 'mousedown').map(() => 0),
      fromEvents(window, 'mouseup').map(() => 1)
    ])
  ), 0)
}
