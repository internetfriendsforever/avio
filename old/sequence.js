import { merge, interval } from 'kefir'

export default (timer, sustain) => merge([
  interval(timer, 1),
  interval(timer, 0).delay(sustain)
]).toProperty(() => 0)
