import { combine, constant } from 'kefir'

function ensureKefirStream (any) {
  return typeof any === 'number' ? constant(any) : any.kefirProperty
}

const mathFunctions = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  pow: (a, b) => Math.pow(a, b),
  floor: (a) => Math.floor(a),
  ceil: (a) => Math.ceil(a)
}

function decorate (stream, name, value) {
  Object.defineProperty(stream, name, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: value
  })
}

function create (kefirStream, initial = 0) {
  const kefirProperty = kefirStream.toProperty(() => initial)

  const stream = {
    kefirProperty
  }

  Object.keys(mathFunctions).forEach(key => {
    decorate(stream, key, (...args) => (
      create(
        combine([
          kefirProperty,
          ...args.map(arg => ensureKefirStream(arg))
        ], mathFunctions[key])
      )
    ))
  })

  decorate(stream, 'connect', function (fn) {
    kefirProperty.onValue(fn)
    return this
  })

  decorate(stream, 'log', function () {
    kefirProperty.log()
    return this
  })

  decorate(stream, 'throttle', function (...args) {
    return create(kefirProperty.throttle(...args), 0)
  })

  decorate(stream, 'delay', function (...args) {
    return create(kefirProperty.delay(...args), 0)
  })

  decorate(stream, 'filter', function (...args) {
    return create(kefirProperty.filter(...args), 0)
  })

  decorate(stream, 'sampledBy', function (...args) {
    return create(kefirProperty.sampledBy(...args), 0)
  })

  return stream
}

export default {
  create
}
