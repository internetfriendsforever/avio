import { constant, combine } from 'kefir'
import math from 'mathjs'

const functions = [
  'add',
  'subtract',
  'multiply',
  'divide',
  'pow',
  'min',
  'max'
]

function createInput (stream, current = 0) {
  const input = stream.toProperty(() => current)

  // Decorate math functions
  functions.forEach(fn => {
    Object.defineProperty(input, fn, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: (...args) => createInput(
        combine([
          input,
          ...args.map(arg => (
            typeof arg === 'number' ? constant(arg) : arg
          ))
        ], math[fn])
      )
    })
  })

  Object.defineProperty(input, 'connect', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: input.onValue
  })

  return input
}

export default createInput
