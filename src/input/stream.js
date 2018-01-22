import { combine, constant } from 'kefir'
import math from 'mathjs'

function ensureKefirStream (any) {
  return typeof any === 'number' ? constant(any) : any.kefirProperty
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

  const mathFunctions = [
    'add',
    'subtract',
    'multiply',
    'divide',
    'pow',
    'floor',
    'ceil'
  ]

  mathFunctions.forEach(fn => {
    decorate(stream, fn, (...args) => (
      create(
        combine([
          kefirProperty,
          ...args.map(arg => ensureKefirStream(arg))
        ], math[fn])
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

  return stream
}

export default {
  create
}