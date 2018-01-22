import input from './input'
import output from './output'

const input1 = input.create()
const audioOutput = output.audio.create()
const triangle = output.visual.triangle.create()
const triangle2 = output.visual.triangle.create()

input1.tap.multiply(input1.mouse.y).connect(audioOutput.gain).connect(triangle.alpha)

input1.mouse.x.multiply(8).floor().add(1).multiply(110).connect(audioOutput.frequency)

input1.mouse.x.multiply(8).floor().add(1).divide(8).connect(triangle.size)

input1.mouse.y.connect(triangle2.x)
