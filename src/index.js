import mouse from './mouse'

const context = new window.AudioContext()
const oscillator = context.createOscillator()
const panner = context.createStereoPanner()

oscillator.frequency.setTargetAtTime(120, 0, 0)
oscillator.connect(panner)
oscillator.start()

panner.connect(context.destination)

mouse.onValue(({ x, y }) => {
  oscillator.frequency.setTargetAtTime(220 - 120 * y, 0, 0.02)
  panner.pan.setTargetAtTime(x * 2 - 1, 0, 0.02)
})
//
//
// map(mouse.x, oscillator.a.frequency, {
//
// })
//
// map(tap, oscillator)
//
// mouse.x.to()
//
// finger.first.down(() => {
//   instrument.first.play(440)
//
//   rectangle.a(0, 0, 100, 100).fill('red')
// })
//
// finger.first.down(() => {
//   instrument.first.play(440)
//
//   rectangle.a(0, 0, 100, 100).fadeOut({
//     duration: 100
//   })
// })
//
// finger.first.drag((x, y, xdelta, ydelta) => {
//   const enhanced = xdelta * 0.5
//   instrument.first.oscillate({
//     frequency: xdelta,
//     detune: ydelta
//   })
// })
