import Reverb from 'soundbank-reverb'

const context = new window.AudioContext()
const oscillator = context.createOscillator()
const gain = context.createGain()
const reverb = Reverb(context)

oscillator.frequency.setTargetAtTime(120, 0, 0)
oscillator.connect(gain)
oscillator.start()

gain.connect(reverb)
reverb.connect(context.destination)

gain.gain.setTargetAtTime(0, 0, 0)

export default {
  frequency: hertz => oscillator.frequency.setTargetAtTime(hertz, 0, 0.005),
  gain: value => gain.gain.setTargetAtTime(value, 0, 0.005)
}
