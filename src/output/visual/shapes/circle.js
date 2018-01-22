import { stream } from 'kefir'
import blend from '../blend'
import depth from '../depth'

const points = 100

const positions = Array(points).fill().map((v, i) => (
  [Math.sin((i / points) * Math.PI * 2) * 0.5, Math.cos((i / points) * Math.PI * 2) * 0.5]
))

function createRenderer (regl) {
  return regl({
    vert: `
      precision mediump float;
      attribute vec2 position;
      uniform vec2 offset;
      uniform float size;

      void main () {
        gl_Position = vec4((position * 2.0 * size) - 1.0 + offset * 2.0, 0, 1);
      }
    `,

    frag: `
      precision mediump float;
      uniform vec4 color;

      void main () {
        gl_FragColor = color;
      }
    `,

    attributes: {
      position: positions
    },

    blend,

    depth,

    uniforms: {
      color: (context, { red, green, blue, alpha }) => [red, green, blue, alpha],
      offset: (context, { x, y }) => [x, 1 - y],
      size: (context, { size }) => size
    },

    count: points,

    primitive: 'triangle fan'
  })
}

function createInstance (callback) {
  let emitter

  const props = {
    x: 0.5,
    y: 0.5,
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1,
    size: 1
  }

  const instance = {}

  Object.keys(props).forEach(key => {
    Object.defineProperty(instance, key, {
      configurable: false,
      enumerable: false,
      writable: false,
      value (value) {
        props[key] = value
        if (emitter) {
          emitter.emit(props)
        }
        return instance
      }
    })
  })

  const kefirProperty = stream(e => {
    emitter = e
  }).toProperty(() => props)

  Object.defineProperty(instance, 'kefirProperty', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: kefirProperty
  })

  Object.defineProperty(props, 'type', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: 'circle'
  })

  Object.defineProperty(instance, 'type', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: 'circle'
  })

  return instance
}

export default {
  createRenderer,
  createInstance
}
