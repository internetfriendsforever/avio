const context = new window.AudioContext()

export function create () {
  const oscillator = context.createOscillator()
  const gain = context.createGain()

  oscillator.frequency.setTargetAtTime(440, 0, 0)
  oscillator.start()
  oscillator.connect(gain)

  gain.connect(context.destination)
  gain.gain.setTargetAtTime(0, 0, 0)

  const transitionTime = 0.005

  return {
    frequency (value) {
      oscillator.frequency.setTargetAtTime(value, 0, transitionTime)
      return this
    },

    gain (value) {
      gain.gain.setTargetAtTime(value, 0, transitionTime)
      return this
    }
  }
}

export default {
  create
}
