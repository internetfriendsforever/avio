import { stream as kefirStream } from 'kefir'
import stream from './stream'

const raf = kefirStream(emitter => {
  function tick (time = 0) {
    emitter.emit(time)
    window.requestAnimationFrame(tick)
  }

  tick()
})

export default {
  sine: (rate = 1000) => stream((
    raf.map(seconds => Math.sin(seconds / (rate / Math.PI)) * 0.5 + 0.5)
  )),

  square: (rate = 1000) => stream((
    raf.map(seconds => Math.round(Math.sin(seconds / (rate / Math.PI)) * 0.5 + 0.5)).skipDuplicates()
  ))
}
