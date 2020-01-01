import shape from './utils/shape.js'

export default shape({
  type: 'line',

  props: {
    x1: 0,
    y1: 0,
    x2: 0.5,
    y2: 0.5,
    width: 0.01,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: (context, props, aspect) => {
    const { x1, y1, x2, y2, width, hue, saturation, lightness, alpha } = props

    // aspect()
    context.beginPath()
    context.lineWidth = width
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.strokeStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`
    context.stroke()
  }
})
