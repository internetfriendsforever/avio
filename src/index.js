import { multiply } from './math'
import mouse from './mouse'
import output from './output'

multiply(mouse.tap, mouse.y)
  .observe(output.gain)

multiply(mouse.x, mouse.tap)
  .map(x => x * 440 + 80)
  .observe(output.frequency)

// More advanced and works, but not very readable
//
// import { combine, constant, repeat, sequentially } from 'kefir'
// import { pow, multiply } from './math'
// import sequence from './sequence'
// import mouse from './mouse'
// import output from './output'
//
// const arp = repeat(i => sequentially(100, [1, 1.5, 1.5, 2]))
// combine([mouse.x, arp], (x, arp) => Math.pow(x * 64, 2) * arp + 80).throttle(100).observe(output.frequency)
// pow(multiply(mouse.y, mouse.x.map(x => 1 - x), mouse.tap, sequence(50, 10)), constant(2)).log().observe(output.gain)

// Would the following be more clear maybe? Further from Kefir, but?
// (currently doesn’t fit the api – not working)
//
// mouse.x
//   .multiply(64)
//   .pow(2)
//   .multiply(arp(100, [1, 1.5, 1.5, 2]))
//   .add(80)
//   .connect(frequency)
//
// mouse.y
//   .multiply(mouse.x.map(x => 1 - x))
//   .multiply(mouse.tap)
//   .multiply(sequence(50, 10))
//   .pow(2)
//   .connect(gain)
