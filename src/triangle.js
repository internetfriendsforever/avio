export default regl => regl({
  vert: `
    precision mediump float;
    attribute vec2 position;
    uniform vec2 offset;

    void main () {
      gl_Position = vec4(position * 2.0 - 1.0 + offset * 2.0, 0, 1);
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
      [-0.1, -0.05],
      [0, 0.1],
      [0.1, -0.05]
    ]
  },

  uniforms: {
    color: regl.prop('color'),
    offset: (context, props) => [props.position.x, 1 - props.position.y]
  },

  count: 3
})
