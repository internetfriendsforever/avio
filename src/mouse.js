import { fromEvents } from 'kefir'

export default fromEvents(window, 'mousemove', e => ({
  x: e.clientX / window.innerWidth,
  y: e.clientY / window.innerHeight
})).toProperty(() => ({
  x: 0.5,
  y: 0.5
}))
