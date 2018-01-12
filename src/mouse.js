import { fromEvents, merge } from 'kefir'

const move = fromEvents(window, 'mousemove')

export default {
  x: move.map(e => e.clientX / window.innerWidth).toProperty(() => 0.5),
  y: move.map(e => e.clientY / window.innerHeight).toProperty(() => 0.5),
  tap: merge([
    fromEvents(window, 'mousedown').map(() => 1),
    fromEvents(window, 'mouseup').map(() => 0)
  ]).toProperty(() => 0)
}
