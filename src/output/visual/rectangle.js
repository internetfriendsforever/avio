import shape from './render/shape'
import blend from './render/blend'
import depth from './render/depth'

export default shape({
  type: 'rectangle',

  props: {
    x: 0.5,
    y: 0.5,
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1,
    width: 1,
    height: 1
  },

  render: regl => {
    return regl({
      vert: `
        precision mediump float;
        attribute vec2 position;
        uniform vec2 offset;
        uniform vec2 size;

        void main () {
          gl_Position = vec4(((position * 2.0 * size) - 1.0 + offset * 2.0) - size, 0, 1);
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
          [0.0, 0.0],
          [1.0, 0.0],
          [0.0, 1.0],
          [1.0, 1.0]
        ]
      },

      blend,

      depth,

      uniforms: {
        color: (context, { red, green, blue, alpha }) => [red, green, blue, alpha],
        offset: (context, { x, y }) => [x, 1 - y],
        size: (context, { width, height }) => [width, height]
      },

      elements: [
        [0, 1, 2],
        [1, 2, 3]
      ]
    })
  }
})
