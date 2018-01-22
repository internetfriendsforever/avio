import input from './input'
import output from './output'

const input1 = input.create()
const audioOutput1 = output.audio.create()
const circle = output.visual.circle.create().size(0.1)

output.visual.triangle.create().size(0.5).alpha(0.5).green(0).blue(0)

input1.tap.multiply(input1.mouse.y).connect(circle.y).pow(2).connect(audioOutput1.gain).multiply(0.1).connect(circle.size)

const note = input1.mouse.x.multiply(8).floor()

note.add(1).multiply(110).connect(audioOutput1.frequency)
note.add(0.5).divide(8).connect(circle.x)
