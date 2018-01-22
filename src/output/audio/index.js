const context = new window.AudioContext()

export function create () {
  const oscillator = context.createOscillator()
  const gain = context.createGain()

  oscillator.frequency.setTargetAtTime(440, 0, 0)
  oscillator.start()
  oscillator.connect(gain)

  gain.connect(context.destination)
  gain.gain.setTargetAtTime(0, 0, 0)

  const transitionTimes = {
    gain: 0.005,
    frequency: 0.005
  }

  return {
    sine () {
      oscillator.type = 'sine'
      return this
    },

    square () {
      oscillator.type = 'square'
      return this
    },

    sawtooth () {
      oscillator.type = 'sawtooth'
      return this
    },

    triangle () {
      oscillator.type = 'triangle'
      return this
    },

    gainTransitionTime (value) {
      transitionTimes.gain = value
      return this
    },

    frequencyTransitionTime (value) {
      transitionTimes.frequency = value
      return this
    },

    gain (value) {
      gain.gain.setTargetAtTime(value, 0, transitionTimes.gain)
      return this
    },

    frequency (value) {
      oscillator.frequency.setTargetAtTime(value, 0, transitionTimes.frequency)
      return this
    }
  }
}

export default {
  create
}
