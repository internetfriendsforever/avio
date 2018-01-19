import { fromEvents, merge } from 'kefir'
import input from './input'

const move = fromEvents(window, 'mousemove')

export default {
  x: input(move.map(e => e.clientX / window.innerWidth).toProperty(() => 0.5)),
  y: input(move.map(e => e.clientY / window.innerHeight).toProperty(() => 0.5)),
  tap: input(merge([
    fromEvents(window, 'mousedown').map(() => 1),
    fromEvents(window, 'mouseup').map(() => 0)
  ]).toProperty(() => 0))
}
