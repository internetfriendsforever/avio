import { stream, combine, fromEvents } from 'kefir'
import raf from './raf'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

window.addEventListener('load', () => {
  document.body.style.margin = 0
  document.body.appendChild(canvas)
})

canvas.style.width = '100%'
canvas.style.height = '100%'
canvas.style.display = 'block'

const resize = fromEvents(window, 'resize').map(getSize).toProperty(getSize)

resize.onValue(updateSize)

const instances = []

let renderStream

function updateSize (size) {
  canvas.width = size.width
  canvas.height = size.height
}

function getSize () {
  return {
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio
  }
}

function aspect () {
  const { width, height } = canvas

  if (width < height) {
    context.scale(1, width / height)
  } else {
    context.scale(height / width, 1)
  }
}

function render (instances) {
  context.save()
  context.fillStyle = 'black'
  context.scale(canvas.width, canvas.height)
  context.fillRect(0, 0, 1, 1)
  context.lineWidth = 1 / Math.min(canvas.width, canvas.height)

  instances.forEach(instance => {
    context.save()
    instance.render(context, instance, aspect)
    context.restore()
  })

  context.restore()
}

function add (instance) {
  instances.push(instance)

  if (renderStream) {
    renderStream.offValue(render)
  }

  const kefirProperties = instances.map(instance => instance.kefirProperty)

  renderStream = raf(combine([resize, ...kefirProperties], (size, ...properties) => (
    properties
  ))).onValue(render)

  return instance
}

export default function ({ type, props, render }) {
  return function () {
    let emitter

    const instanceProps = Object.assign({}, props)
    const instance = {}

    Object.keys(instanceProps).forEach(key => {
      Object.defineProperty(instance, key, {
        configurable: false,
        enumerable: false,
        writable: false,
        value (value) {
          instanceProps[key] = value

          if (emitter) {
            emitter.emit(instanceProps)
          }

          return instance
        }
      })
    })

    const kefirProperty = stream(e => {
      emitter = e
    }).toProperty(() => instanceProps)

    Object.defineProperty(instance, 'kefirProperty', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: kefirProperty
    })

    Object.defineProperty(instanceProps, 'render', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: render
    })

    return add(instance)
  }
}
