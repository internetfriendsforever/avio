import { fromEvents, merge } from 'kefir'
import stream from './stream'

export default {
  x: stream.create((
    fromEvents(window, 'mousemove')
      .map(e => e.clientX / window.innerWidth)
      .skipDuplicates()
  ), 0),

  y: stream.create((
    fromEvents(window, 'mousemove')
      .map(e => e.clientY / window.innerHeight)
      .skipDuplicates()
  ), 0),

  down: stream.create((
    merge([
      fromEvents(window, 'mousedown').map(() => 1),
      fromEvents(window, 'mouseup').map(() => 0)
    ])
  ), 0)
}
