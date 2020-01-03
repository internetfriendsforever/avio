import { combine, constant } from 'kefir'

const mathFunctions = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
}

Object.getOwnPropertyNames(Math)
  .filter(key => typeof Math[key] === 'function')
  .forEach(name => {
    mathFunctions[name] = Math[name]
  })

export default function createSignal (stream, initial = 0) {
  const property = stream.toProperty(() => initial)

  const signal = {
    property
  }

  const define = (name, value) => {
    Object.defineProperty(signal, name, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: value
    })
  }

  define('signal', true)

  Object.keys(mathFunctions).forEach(key => {
    define(key, (...args) => (
      createSignal(
        combine([
          property,
          ...args.map(arg => {
            if (typeof arg === 'object' && arg.signal) {
              return arg.property
            } else {
              return constant(arg)
            }
          })
        ], mathFunctions[key])
      )
    ))
  })

  define('connect', function (fn) {
    property.onValue(fn)
    return this
  })

  define('print', function () {
    property.log()
    return this
  })

  define('throttle', function (...args) {
    return createSignal(property.throttle(...args), 0)
  })

  define('delay', function (...args) {
    return createSignal(property.delay(...args), 0)
  })

  return signal
}
