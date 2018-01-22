import { stream } from 'kefir'

function createRenderer (regl) {
  return regl({
    vert: `
      precision mediump float;
      attribute vec2 position;
      uniform vec2 offset;
      uniform float size;

      void main () {
        gl_Position = vec4((position * 2.0 - 1.0 + offset * 2.0) * size, 0, 1);
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
      position: [
        [-0.5, -0.5],
        [0, 0.5],
        [0.5, -0.5]
      ]
    },

    blend: {
      enable: true,
        func: {
        srcRGB: 'src alpha',
        srcAlpha: 1,
        dstRGB: 'one minus src alpha',
        dstAlpha: 1
      },
      equation: {
        rgb: 'add',
        alpha: 'add'
      },
      color: [0, 0, 0, 0]
    },

    uniforms: {
      color: (context, { red, green, blue, alpha }) => [red, green, blue, alpha],
      offset: (context, { x, y }) => [x, 1 - y],
      size: (context, { size }) => size
    },

    count: 3
  })
}

function createInstance () {
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
        return instance
      }
    })
  })

  Object.defineProperty(instance, 'props', {
    configurable: false,
    enumerable: true,
    writable: false,
    value: () => props
  })

  return instance
}

export default {
  createRenderer,
  createInstance
}
