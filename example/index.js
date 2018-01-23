import avio from '../src'

const circle = avio.output.visual.circle.create()
avio.input.create().mouse.x.multiply(360).connect(circle.hue)

const rectangle = avio.output.visual.rectangle.create()
avio.input.create().mouse.x.multiply(360).add(50).connect(rectangle.hue)

const square = avio.output.visual.square.create()
avio.input.create().mouse.x.multiply(360).add(100).connect(square.hue)

const triangle = avio.output.visual.triangle.create()
avio.input.create().mouse.x.multiply(360).add(150).connect(triangle.hue)

const line = avio.output.visual.line.create()
avio.input.create().mouse.x.connect(line.x2)
avio.input.create().mouse.y.connect(line.y2)

// const { input, output } = avio
//
// const input1 = input.create()
// const audioOutput1 = output.audio.create()
// const circle = output.visual.circle.create().size(0.1)
// const triangle = output.visual.triangle.create().alpha(1).red(0.2)
// const rectangle = output.visual.rectangle.create().green(0).blue(0.5).width(0.5).height(0.5)
//
// input1.tap.connect(triangle.blue).connect(triangle.green).multiply(0.1)
//
// input1.tap.multiply(input1.mouse.y).pow(2).connect(audioOutput1.gain).multiply(0.5).connect(rectangle.red)
//
// const note = input1.mouse.x.multiply(9).floor()
//
// note.add(1).multiply(110).connect(audioOutput1.frequency)
// note.add(0.5).divide(9).connect(circle.x)
//
// input1.mouse.y.connect(circle.y)
