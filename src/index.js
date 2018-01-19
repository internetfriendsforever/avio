import mouse from './mouse'
import output from './output'

// const beatInput1 = input.create().x(0).y(0).width(0.5).height(1)
// const beatInput2 = input.create().x(0.5).y(0).width(0.5).height(1)
// const beatOutput = output.create()
//
// beatInput1.tap.connect(beatOutput.gain)
// beatInput1.tap.multiply(440).connect(beatOutput.frequency)
//
// beatInput2.tap.connect(beatOutput.gain)
// beatInput2.tap.multiply(880).connect(beatOutput.frequency)

// const beatInput = input.create().x(0.5).y(0).width(0.5).height(1)
// const beatOutput = output.create()
// const beatOutput2 = output.create()
//
// beatInput.tap.connect(beatOutput.gain)
// beatInput.mouse.x.connect(beatOutput2.gain)

// input()
//   .x(0)
//   .y(0)
//   .width(0.5)
//   .height(1)
//   .tap(output.gain)
//   .moveX(output.frequency)

// input()
//   .x(0.5)
//   .y(0)
//   .width(0.5)
//   .height(1)
//   .tap(output.frequency)

// const beat = input({
//   x: 0,
//   y: 0,
//   width: 0.5,
//   height: 1
// })

mouse.tap.connect(output.gain)
mouse.tap.multiply(mouse.x).min(0.5).multiply(1000).add(80).connect(output.frequency)

// mouse.tap.connect(output.gain)
// mouse.tap.multiply(mouse.x).multiply(1000).add(80).connect(output.frequency)

// multiply(mouse.tap, mouse.x).map(x => x * 1000 + 80).observe(output.frequency)
// mouse.x.multiply(mouse.tap).multiply(1000).add(80).observe(output.frequency)
// mouse.x.multiply(mouse.tap).map(x => x * 1000 + 80).observe(output.frequency)

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

// mouse.y.multiply(mouse.tap).connect(gain)
// mouse.x.multiply(1000).add(80).connect(frequency)
