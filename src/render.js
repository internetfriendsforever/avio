import { stream } from 'kefir'

export default stream(emitter => {
  let frame

  const tick = () => {
    emitter.emit()
    frame = window.requestAnimationFrame(tick)
  }

  tick()

  return () => window.cancelAnimationFrame(frame)
})
