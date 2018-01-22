import input from './input'
import output from './output'

const input1 = input.create()
const audioOutput1 = output.audio.create()
const circle = output.visual.circle.create().size(0.1)
const triangle = output.visual.triangle.create().size(0.5).alpha(1).red(0.2)
const rectangle = output.visual.rectangle.create().green(0).blue(0.1)

input1.tap.connect(triangle.blue).connect(triangle.green).multiply(0.1)

input1.tap.multiply(input1.mouse.y).pow(2).connect(audioOutput1.gain).multiply(0.5).connect(rectangle.red)

const note = input1.mouse.x.multiply(9).floor()

note.add(1).multiply(110).connect(audioOutput1.frequency)
note.add(0.5).divide(9).connect(circle.x)

input1.mouse.y.connect(circle.y)
