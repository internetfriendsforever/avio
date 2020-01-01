import shape from './shape.js'

export default shape({
  type: 'circle',

  props: {
    x: 0,
    y: 0,
    diameter: 1,
    hue: 0,
    saturation: 1,
    lightness: 0.5,
    alpha: 1
  },

  render: (context, props, aspect) => {
    const { x, y, diameter, hue, saturation, lightness, alpha } = props

    context.translate(x, y)
    aspect()
    context.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`
    context.beginPath()
    context.arc(0, 0, Math.max(0, diameter) / 2, 0, Math.PI * 2)
    context.closePath()
    context.fill()
  }
})
